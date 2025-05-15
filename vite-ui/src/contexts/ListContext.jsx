import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import api from "../utils/api";
import { useCurrentPath } from "@/hooks/usePath";
import { useUI } from "./UIContext";
import { UIStatus } from "../constants/UIStatus";
import { useSearchParams } from "react-router";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext";

const ListContext = createContext({});

export const ListProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams("");
const { account } = useAuth("")
  const currentPath = useCurrentPath()
  const userId = account?.user_id || "guest";

  const localStoragePath = `${userId}:${currentPath}`

  const defaultpageSize =
    parseInt(searchParams.get("size")) ||
    parseInt(localStorage.getItem(`${localStoragePath} - pageSize`)) ||
    6;
  const defaultcurrentPage =
    parseInt(searchParams.get("page")) ||
    parseInt(localStorage.getItem(`${localStoragePath} - currentPage`)) ||
    0;
  const defaultsortBy =
    searchParams.get("sort") ||
    localStorage.getItem(`${localStoragePath} - sortBy`) ||
    null;
  const defaultsearchValue =
    searchParams.get("search") ||
    localStorage.getItem(`${localStoragePath} - searchValue`) ||
    "";

  const initialPagination = {
    currentPage: defaultcurrentPage,
    totalPages: 0,
    pageSize: defaultpageSize,
    sortBy: defaultsortBy,
    searchValue: defaultsearchValue,
    error: null,
    content: [],
    message: null,
  };
  const [pagination, setPagination] = useState(initialPagination);
  const [update, setUpdate] = useState(0);
  const { status, setStatus } = useUI();
  const { Loading, Success, Error } = UIStatus;
  const isEmpty = status === Success && pagination.content.length === 0;

  const getPage = useCallback(
    async (size, page, sort, search) => {
      try {
        setStatus(Loading);
        const response = await api.get(
          `/${currentPath}/pagination?page=${page}&size=${size}${
            sort ? `&sort=${sort}` : ""
          }${search ? `&search=${search}` : ""}`
        );

        const { data, message, success } = response.data;

        if (page >= data.totalPages && data.totalPages > 0) {
          setStatus(Error);
          toast.error("Bad page request");
          return;
        }
        if (success && data) {
          setPagination((prev) => ({
            ...prev,
            content: data.content || [],
            totalPages: data.totalPages ?? 0,
            error: null,
            message: message,
          }));
          setStatus(Success);
        } else {
          setPagination((prev) => ({
            ...prev,
            content: [],
            totalPages: 0,
          }));
          setStatus(Error);
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ?? error.message ?? "Unknown error";
        setPagination((prev) => ({
          ...prev,
          error: errorMessage,
          content: [],
          totalPages: 0,
        }));
        setStatus(Error);
      }
    },
    [currentPath, setStatus]
  );

  const onPageSizeChange = (e) => {
    const pageSize = Math.max(1, parseInt(e.target.value, 10));
    setPagination((prev) => ({ ...prev, currentPage: 0, pageSize: pageSize }));
    localStorage.setItem(`${localStoragePath} - pageSize`, pageSize);
    searchParams.set("size", pageSize);
    setSearchParams(searchParams);
  };

  const onPaginate = (page) => {
    if (page < 0 || page >= pagination.totalPages) return;

    setPagination((prev) => ({ ...prev, currentPage: page }));
    localStorage.setItem(`${localStoragePath} - currentPage`, page);
    searchParams.set("page", page);
    setSearchParams(searchParams);
  };

  const onSortBy = (e) => {
    let sortByValue = e.target.value;

    setPagination((prev) => ({ ...prev, sortBy: sortByValue, currentPage: 0 }));
    localStorage.setItem(`${localStoragePath} - sortBy`, sortByValue);
    localStorage.removeItem(`${localStoragePath} - currentPage`);
    searchParams.set("sort", sortByValue);
    setSearchParams(searchParams);
  };

  const handleSearch = (searchValue) => {
    setPagination((prev) => ({ ...prev, searchValue: searchValue }));
    localStorage.setItem(`${localStoragePath} - searchValue`, searchValue);
    searchParams.set("search", searchValue);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    getPage(
      pagination.pageSize,
      pagination.currentPage,
      pagination.sortBy,
      pagination.searchValue
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [
    pagination.pageSize,
    pagination.currentPage,
    pagination.sortBy,
    pagination.searchValue,
    getPage,
    currentPath,
    searchParams,
    update,
  ]);

  return (
    <ListContext.Provider
      value={{
        getPage,
        onPageSizeChange,
        onPaginate,
        onSortBy,
        handleSearch,
        setPagination,
        ...pagination,
        isEmpty,
        localStoragePath,
        searchParams,
        setUpdate,
      }}
    >
      {children}
    </ListContext.Provider>
  );
};

export const useList = () => {
  return useContext(ListContext);
};
