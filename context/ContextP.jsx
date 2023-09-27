import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { auth } from "../config/Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { RotatingLines } from "react-loader-spinner";


const initialState = {
  email: localStorage.getItem("email") || "",
  hasSigned: localStorage.getItem("hasSigned") || false,
};
function reducer(state, action) {
  switch (action.type) {
    case "signin":
      localStorage.setItem("email", action.payload);
      localStorage.setItem("hasSigned", true);
      return {
        ...state,
        email: action.payload,
        hasSigned: true,
      };
      case "signout" : 
      localStorage.removeItem("email")
      localStorage.removeItem("hasSigned")
      return {
        ...state,email:"", hasSigned:false
      }
    default:
      return state;
  }
}

const contextProvider = createContext()

function ContextP({children}) {
const [{ email }, dispatch] = useReducer(reducer, initialState);
   function signIn(email) {
    dispatch({type:"signin",payload:email})
   }
   function signout(){
    dispatch({type:"signout"})
   }
   const [openModal,setOpenModal] = useState(false)
   const [openRenewModal,setOpenRenewModal] = useState(false)
   const [openUpdateModal,setOpenUpdateModal] = useState(false)
   const [selectedId,setSelectedId] = useState(null)
   const [selectedUpdateId,setSelectedUpdateId] = useState(null)
   const [search,setSearch] = useState("")
     const [filteredData, setFilteredData] = useState([]);
     const [user,setUser] = useState(null)
       const [loading, setLoading] = useState(true);
    
     useEffect(() => {
       const unsubscribe = onAuthStateChanged(auth, (user) => {
         setUser(user); // Update the user state when sign-in state changes
         setLoading(false)
       });

       // Clean up the listener when the component unmounts
       return () => unsubscribe();
     }, [auth]);
  
     
   

  return (
    <contextProvider.Provider
      value={{
        email,
       
        dispatch,
        signIn,
        openModal,
        setOpenModal,
        openRenewModal,
        setOpenRenewModal,
        selectedId,
        setSelectedId,
        openUpdateModal,
        setOpenUpdateModal,
        selectedUpdateId,
        setSelectedUpdateId,
        search,
        signout,
        setSearch,
        filteredData,
        setFilteredData,
        user,
      }}
    >
      {!loading ? (
        children
      ) : (
        <div className=" flex justify-center items-center w-screen h-screen">
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />{" "}
        </div>
      )}
    </contextProvider.Provider>
  );
}

export default ContextP

export function UseData() {
  const context = useContext(contextProvider);
  if (context === undefined) throw new Error("the context is wrong ");
  return context;
}
