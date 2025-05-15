import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import { CircleUserRoundIcon } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut } from "lucide-react";
import { NavLink } from "react-router";

export const DropDownMenu = () => {
  const { account, logout } = useAuth();

  return (
    <DropdownMenu >
      <DropdownMenuTrigger className="focus:outline-none me-10 ">
        {account ? (
          <Menu className="-5 h-5 md:w-7.5 md:h-7.5 text-sky-950 hover:scale-110 duration-300" />
        ) : (
          <CircleUserRoundIcon className="w-5 h-5 md:w-7.5 md:h-7.5 text-sky-950 hover:scale-110 duration-300" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" mt-1 md:mt-3 flex flex-col items-center w-[100px] min-w-0 text-white bg-blue-500">
        {account ? (
          <>
            <DropdownMenuItem
              className="responsive-text-lg"
              onSelect={() => logout()}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem asChild><NavLink to={"/login"}>LogIn</NavLink></DropdownMenuItem>
            <DropdownMenuItem asChild><NavLink to={"/register"}>Register</NavLink></DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
