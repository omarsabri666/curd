import { Outlet, useLocation } from "react-router";
import Header from "./Header";

function AppLayout() {

   
    return (
        <div className=" max-w-5xl mx-auto">
            <div>
                <Header/>
                
            </div>

            <Outlet/>
        </div>
    )
}

export default AppLayout
