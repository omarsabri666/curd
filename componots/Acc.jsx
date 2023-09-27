import { signOut } from "firebase/auth";
import { UseData } from "../context/ContextP";
import { auth } from "../config/Firebase";
import {BiLogOut} from "react-icons/bi"
import { toast } from "react-toastify";

function Acc() {


    const {email,signout,user} = UseData()
      const logout = async () => {
        try {
          await signOut(auth);
          toast.success("signed out successfully");
        } catch (err) {
          console.error(err);
            toast.error("could not signed out ");
        }
      };

    return (
      <div>
        <div className="   items-center flex  gap-2">
         { user?.photoURL ? <img className=" rounded-full  w-12 h-12" src={user.photoURL}/>  :<img
            className="  rounded-full w-16 h-16"
            src="https://www.inquirer.com/resizer/tieQcqJxZRkxMcp64Typ9c8vYL8=/760x507/smart/filters:format(webp)/cloudfront-us-east-1.images.arcpublishing.com/pmn/OPKHDT2FBPB3Z6WJLYOWTUX3TI.jpg"
            alt=""
          />}
          <h2>{user.displayName ? user.displayName : user.email}</h2>
          <button onClick={logout} className=" text-blue-600">
           <BiLogOut color="green" size={30}/>
          </button>
        </div>
      </div>
    );
}

export default Acc
