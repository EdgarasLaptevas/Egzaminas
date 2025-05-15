import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { Search } from "lucide-react";

const searchBarVariants = cva(
  "flex items-center w-full transition-all shadow-sm focus:outline-none focus:ring-1 focus:ring-offset-1 md:focus:ring-2 md:focus:ring-offset-2",
  {
    variants: {
      intent: {
        default: " border border-info focus:ring-blue-500 bg-white shadow-md shadow-[#008888]",
        filled: "border-none bg-gray-100",
        subtle: "border-transparent bg-transparent",
        info: "border-blue-500 bg-blue-50",
      },
      size: {
        sm: "text-sm px-3 py-1.5",
        md: "text-base px-4 py-2 ",
        lg: "text-lg px-5 py-3",
        responsive: "text-xs lg:text-sm px-6 md:px-7 lg:px-8 py-1.5 md:py-1.75 lg:py-2"
      },
      radius: {
        default: "rounded-[17px]",
        full: "rounded-full",
        none: "rounded-none",
      },
    },
    defaultVariants: {
      intent: "default",
      size: "responsive",
      radius: "default",
    },
  }
);

export const SearchBar = ({
  className,
  variantIntent,
  size,
  radius,
  placeholder = "Search...",
  value,
  onChange,
  onSubmit,
  icon = true,
  ...props
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className={cn("relative", className)}
    >
      {icon && (
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
      )}
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={cn(
          searchBarVariants({
            intent: variantIntent,
            size,
            radius,
          }),
          icon && "pl-10"
        )}
        {...props}
      />
    </form>
  );
};

export {searchBarVariants}