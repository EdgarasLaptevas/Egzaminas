import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useList } from "@/contexts/ListContext";

export const SortPanel = ({ SortFields }) => {
  const { sortBy, onSortBy } = useList();
 
  return (
    <div className="flex items-center gap-1 md:gap-2">
      <Select
        value={sortBy}
        onValueChange={(value) => onSortBy({ target: { value } })}
      >
        <span className="text-[10px] md:text-xs text-info-content w-10">
        sort by:
        </span>
        <SelectTrigger className="focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-blue-500 rounded-full shadow-md  flex items-center text-xs md:text-sm border-blue-400 bg-blue-500 text-white ">
          <p>select</p>
        </SelectTrigger>
        <SelectContent className="z-50 w-[105px] md:w-[125px] lg:w-[130px] overflow-auto rounded-md border border-blue-400 bg-gradient-to-br from-blue-300 via-sky-300 to-indigo-300 shadow-lg ">
          {SortFields.map((field) => (
            <SelectItem
              key={field.value}
              value={field.value}
              className="relative flex w-full  select-none items-center outline-none  data-[disabled]:pointer-events-none data-[disabled]:opacity-50 cusor-pointer font-semibold  px-1 py-1 text-[10px] sm:px-1.5 sm:py-1.25 md:text-xs md:px-2 md:py-1.5 lg:px-2.5 lg:py-1.75 hover:bg-blue-400 data-[state=checked]:font-semibold
                text-info-content focus:font-semibold rounded-[10px] "
            >
              {field.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
