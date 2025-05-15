import { SearchBar } from "../ui/search";
import { TicketX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useList } from "@/contexts/ListContext";

export const SearchBarPanel = ({ delay = 1000, ...props }) => {
  const {
    handleSearch,
    localStoragePath,
     searchParams
  } = useList();
  
  const initialSearchValue = searchParams.get("search") 
  || localStorage.getItem(`${localStoragePath} - searchValue`) 
  || "";

const [searchValue, setSearchValue] = useState(initialSearchValue);
const lastSentValue = useRef(initialSearchValue);

  useEffect(() => {
    const trimmedValue = searchValue.trim();

    if (lastSentValue.current === trimmedValue) return;

    const safeSearch = encodeURIComponent(trimmedValue);

    const timeout = setTimeout(() => {
      handleSearch(safeSearch);
      lastSentValue.current = trimmedValue;
    }, delay);

    return () => clearTimeout(timeout);
  }, [searchValue, delay, handleSearch]);

  const handleSearchClear = () => {
    setSearchValue("");
    handleSearch("");
    lastSentValue.current = "";
  };

  return (
    <div className="w-7/10 xs:w-1/2 sm:w-4/10  md:3/10 relative">
      <SearchBar
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
        {...props}
      />
      {searchValue && <button
        type="button"
        onClick={handleSearchClear}
        className="absolute right-3 top-1/2 -translate-y-1/2 "
      >
        <TicketX className="hover:text-red-800 text-info-content transition w-4 md:w-4.5 lg:w-5" />
      </button>}
    </div>
  );
};
