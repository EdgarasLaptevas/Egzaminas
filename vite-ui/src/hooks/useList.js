// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import api from "@/utils/api";
// import { UIStatus } from "@/constants/UIStatus";
// import { useUI } from "@/context/UIContext";
// import toast from "react-hot-toast";

// export const useListStore = create(
//   persist(
//     (set, get) => ({
//       content: [],
//       currentPage: 0,
//       pageSize: 6,
//       totalPages: 0,
//       sortBy: null,
//       searchValue: "",
//       error: null,
//       message: null,

//       getPage: async (path, size, page, sort, search) => {
//         const { setStatus } = useUI.getState();
//         try {
//           setStatus(UIStatus.Loading);

//           const response = await api.get(
//             `/${path}/pagination?page=${page}&size=${size}${
//               sort ? `&sort=${sort}` : ""
//             }${search ? `&search=${search}` : ""}`
//           );

//           const { data, message, success } = response.data;

//           if (page >= data.totalPages && data.totalPages > 0) {
//             setStatus(UIStatus.Error);
//             toast.error("Bad page request");
//             return;
//           }

//           if (success && data) {
//             set({
//               content: data.content || [],
//               totalPages: data.totalPages ?? 0,
//               error: null,
//               message,
//             });
//             setStatus(UIStatus.Success);
//           } else {
//             set({
//               content: [],
//               totalPages: 0,
//               error: null,
//               message: null,
//             });
//             setStatus(UIStatus.Error);
//           }
//         } catch (error) {
//           const errorMessage =
//             error.response?.data?.message ?? error.message ?? "Unknown error";

//           set({
//             error: errorMessage,
//             content: [],
//             totalPages: 0,
//           });
//           setStatus(UIStatus.Error);
//         }
//       },

//       onPageSizeChange: (size) => {
//         set({
//           pageSize: size,
//           currentPage: 0,
//         });
//       },

//       onPaginate: (page) => {
//         if (page < 0 || page >= get().totalPages) return;
//         set({ currentPage: page });
//       },

//       onSortBy: (sort) => {
//         set({
//           sortBy: sort,
//           currentPage: 0,
//         });
//       },

//       handleSearch: (searchValue) => {
//         set({ searchValue });
//       },
//     }),
//     {
//       name: "list-storage",
//       partialize: (state) => ({
//         pageSize: state.pageSize,
//         sortBy: state.sortBy,
//         searchValue: state.searchValue,
//         currentPage: state.currentPage,
//       }),
//     }
//   )
// );
