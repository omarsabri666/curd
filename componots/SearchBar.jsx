import { useEffect, useRef } from "react";
import { UseData } from "../context/ContextP";

function SearchBar() {
    const inputRef = useRef(null)
    const {search,setSearch} = UseData()
    function handleSearch(e){
        setSearch(e)


    }
    // useEffect(()=>{
    //     function handelBlur(){
    //         setSearch("")

    //     }
    //     inputRef.current.addEventListener("blur", handelBlur);

    //     return ()=> inputRef.current.removeEventListener("blur",handelBlur)
    // },[search])
   
    
  
    return (
      <>
        <input
          ref={inputRef}
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className=" py-2  rounded-lg  outline outline-lime-600  px-4  focus:outline-none focus:ring focus:ring-green-500 shadow-xl"
          type="text"
          placeholder="search"
        />
      </>
    );
}

export default SearchBar
