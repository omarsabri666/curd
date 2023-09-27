import { NavLink, useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";
import { UseData } from "../context/ContextP";
import Acc from "./Acc";
import { AiFillHome, AiOutlineHome } from "react-icons/ai";

function Nav() {
  const {user} = UseData()
  const location = useLocation()
  
  
 const isRenderSearchBar =
   location.pathname !== "/createacc" && location.pathname !== "/sign";
   const IsHome = location.pathname !== "/home" && location.pathname !=="/"
  
  
  
   
    return (
      <nav className=" my-2 py-2 flex justify-around   items-center ">
        { IsHome &&<ul>
          <li>
            <NavLink to="home">
              <AiOutlineHome size={30} color="green" />
            </NavLink>
          </li>
        </ul>}
        {isRenderSearchBar && (
          <ul className="flex items-center gap-10 justify-between">
            <li>
              <SearchBar />
            </li>
          </ul>
        )}
        <ul className=" flex items-center  ">
          <li className="  justify-self-end">
            {!user?.email && (
              <NavLink
                to="sign"
                className=" bg-[#09a765] py-2 px-4 rounded-full  hover:bg-[#51977a] shadow-md text-white font-semibold   "
              >
                Sign in
              </NavLink>
            )}
            {user && <Acc />}
          </li>
        </ul>
      </nav>
    );
}

export default Nav
