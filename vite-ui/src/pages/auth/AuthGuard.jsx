import { NavLink } from "react-router";
import { useAuth } from "../../contexts/AuthContext";

export const AuthGuard = ({ children }) => {
  const { account } = useAuth();

  if (!account) {
    return (
        <div>
          <p className="responsive-text-xl  pb-2 text-info-content text-center font-bold p-2">You must be logged<br/> to be able to use this option</p>
          <NavLink to={"/login"}>
            <p type="link" className="text-[#2B89A8] hover:text-info text-center underline lg:text-xl md:text-lx sm:text-base text-sm"><b>Click here to Login</b></p>
          </NavLink>
        </div>
    );
  }

  return <>{children}</>;
};