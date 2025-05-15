import { NavLink } from "react-router"
import { DropDownMenu } from "@/components/features/DropDownMenu"
import { useCheckAdminRole } from "@/hooks/useCheckRoles"

export const NavBar = () => {

  const admin = useCheckAdminRole()

return (
    <div className="bg-gradient-to-br from-lime-400 via-emerald-400 to-lime-400 flex justify-end p-1 md:p-3 z-50 shadow-lg">
            <div className="w-full  flex justify-evenly">
                 {admin && <NavLink
                        to={"/categories"}
                        className={({ isActive }) =>
              isActive
                ? "text-[#005050] font-semibold hover:animate-pulse"
                : "inline-block transform transition duration-400 hover:-translate-y-1 text-white"
                        }
                      >
                        <p className="text-xs sm:text-sm md:text-base ">Categories</p>
                      </NavLink>}
              <NavLink
                        to={"/posts"}
                        className={({ isActive }) =>
              isActive
                ? "text-[#005050] font-semibold hover:animate-pulse"
                : "inline-block transform transition duration-400 hover:-translate-y-1 text-white"
                        }
                      >
                        <p className="text-xs sm:text-sm md:text-base ">Posts</p>
                      </NavLink>
                     
            </div>
       <DropDownMenu/>
    </div>
)
}