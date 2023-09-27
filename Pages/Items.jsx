import { deleteDoc, doc } from "firebase/firestore"
import {AiFillDelete, AiFillEdit} from "react-icons/ai"
import { db } from "../config/Firebase";
import UpdateItems from "./UpdateItems"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UseData } from "../context/ContextP";
import { toast } from "react-toastify";
import {MdAutorenew} from "react-icons/md"
import { AnimatePresence,motion } from "framer-motion";
function Items({cus}) {
 const   {name,endDate,id,startDate:startDate1} = cus
 const {
   setOpenRenewModal,
   setOpenUpdateModal,
   setSelectedId,
   setSelectedUpdateId,
   openUpdateModal,

 } = UseData();
 const startDate = startDate1?.toDate();
 const queryClient = useQueryClient()
 const endDate1 = endDate?.toDate();
 const hasExpired = endDate1 < new Date()
async function handleDelete(id) {
  try{

    const customerDoc = doc(db, "customers", id);
    await deleteDoc(customerDoc);
       toast.info("customer was deleted");
  } catch(err){
    toast.error("could not delete cutomer")
    throw new Error(err)
  }
 
}
const { mutate ,isLoading:isDeleting } = useMutation((id) => handleDelete(id), {
  onSuccess: () => {
    queryClient.invalidateQueries(["customers"]);
  
  },

});

function handleOpenRenew(e) {
      e.stopPropagation();
      setSelectedId(id)
      setOpenRenewModal(true);
    
      
    
    }
    
function handleOpenUpdate(e) {
      e.stopPropagation();
      setSelectedUpdateId(id);
      setOpenUpdateModal(true); 
    
 
    
}

    return (
      <>
        {openUpdateModal && <UpdateItems cus={cus} />}
        <AnimatePresence>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="   md:w-full    flex items-start md:items-center   md:flex-row  flex-wrap justify-between shadow-lg px-3 py-3"
          >
            <div className=" flex flex-col  w-24 justify-center">
              <h2 className="  text-lg "> Name : </h2>
              <h2 className="  text-lg "> {name}</h2>
            </div>
            <div className=" flex flex-col w-24 justify-center">
              <h3>Start Date :</h3>
              <h3>{startDate?.toLocaleDateString()}</h3>
            </div>
            <div className=" flex flex-col w-24 justify-center">
              <h3>End Date :</h3>
              <h3>{endDate1?.toLocaleDateString()}</h3>
            </div>
            <div
              className={` flex flex-col w-24 justify-center  ${
                hasExpired === true ? "text-red-600" : ""
              }`}
            >
              <h3>expired :</h3>
              <h3>{hasExpired === true ? " out due" : " not yet"}</h3>
            </div>
            <div className=" flex gap-2 md:gap-5 ">


            <button
              onClick={(e) => handleOpenRenew(e)}
              className=" py-2 px-3 bg-white outline outline-lime-600  text-black hover:bg-lime-600 transition-colors rounded-full  disabled:opacity-50 disabled:cursor-not-allowed  hover:text-white"
            >
              <MdAutorenew size={20}/>
            </button>
            <button
              onClick={(e) => handleOpenUpdate(e)}
              className="py-2 px-3 bg-white outline outline-lime-600  text-black hover:bg-lime-600 transition-colors rounded-full disabled:opacity-50 disabled:cursor-not-allowed    hover:text-white"
            >
              <AiFillEdit size={20}/>
            </button>
            <button
              disabled={isDeleting}
              onClick={() => mutate(id)}
              className="py-2 px-3 bg-white outline outline-lime-600  text-black hover:bg-lime-600 transition-colors rounded-full  disabled:opacity-50 disabled:cursor-not-allowed   hover:text-white"
              >
              <AiFillDelete size={20} />
            </button>
              </div>
          </motion.div>
        </AnimatePresence>
      </>
    );
}

export default Items
