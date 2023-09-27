import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { UseData } from "../context/ContextP";
import { useMutation } from "@tanstack/react-query";
import { Timestamp, doc, updateDoc } from "firebase/firestore";
import {  db } from "../config/Firebase";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { AnimatePresence, motion } from "framer-motion";

function EditItems() {
    const {register,handleSubmit} = useForm()
    const queryClient = useQueryClient()
 
    function handleClose(){

setOpenRenewModal(false)
setSelectedId(null)

    }
      const {
        setOpenRenewModal,
     
        setSelectedId,
        selectedId,
        setSearch,
      } = UseData();
      const modalRef = useRef(null);
    //  async function handleUpdate(id, time) {
    //    const durationInMonths = parseInt(time);
    //    const currentDate = Timestamp.now();
    //    const startDate = new Date(currentDate.toMillis()); // Start date is the current date
    //    const endDate = new Date(
    //      startDate.getTime() + durationInMonths * 30 * 24 * 60 * 60 * 1000
    //    ); // Calculate the end date by adding the duration in milliseconds

    //    const customerDoc = doc(db, "customers", id);
    //     updateDoc(customerDoc, {
    //      startDate,
    //      endDate,
    //      duration: time,
    //    });
    //  }
    //   const { mutate } = useMutation((id) => handleUpdate(id), {
    //     onSuccess: () => {
    //    queryClient.invalidateQueries(["customers"]);
    //       setOpenRenewModal(false)
    //     },
    //   });
         
    //   async function onSubmit(data) {
    //    await handleUpdate(selectedId, data.duration);
    //    mutate(selectedId);

       
    //   }
     const { mutate } = useMutation(
       (data) => {
         const durationInMonths = parseInt(data.duration);
         const currentDate = Timestamp.now();
         const endDate = new Date(
           currentDate.toMillis() + durationInMonths * 30 * 24 * 60 * 60 * 1000
         ); // Calculate the end date by adding the duration in milliseconds

        //  const newData = {
        //    ...data,
        //    startDate: currentDate,

        //    endDate,
        //  };
        const customerDoc = doc(db,"customers",selectedId)
         return updateDoc(customerDoc, {startDate:currentDate,endDate});
       },
       {
         onSuccess: () => {
           queryClient.invalidateQueries(["customers"]);
           setOpenRenewModal(false);
           setSearch("")
           toast.success("renewed successfully");
         },
         onError:()=>{
          toast.error("could not renew")
         }
       }
     );
     async function onSubmit(data) {
       mutate(data);
     }
    useEffect(() => {
      function handleClickOutside(e) {
        if (!modalRef.current.contains(e.target)) {
          setOpenRenewModal(false);
          setSelectedId(null);
        }
      }

      document.addEventListener("click", handleClickOutside);

      // Cleanup function to remove the event listener
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }, [selectedId]);
    
    return (
      <AnimatePresence>
        <motion.div
          initial={{ translateX: -1000, opacity: 0, scale: 0.5 }}
          animate={{ translateX: 0, opacity: 1, scale: 1 }}
          exit={{ translateX: -1000, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 flex flex-col items-center justify-center z-50"
        >
          <div className="fixed inset-0 backdrop-filter backdrop-blur-sm bg-opacity-50 bg-gray-900"></div>
          <form
            ref={modalRef}
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white relative  w-1/2 p-6 rounded shadow-lg flex gap-4 flex-col"
          >
            <h1 className="text-xl font-bold mb-4">Renew</h1>

            <div className=" flex flex-col gap-1">
              <label htmlFor="duration">duration from today</label>
              <select
                className="block appearance-none cursor-pointer w-full bg-white border border-gray-300 hover:border-gray-500  px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                name="duration"
                id="duration"
                {...register("duration")}
                required
              >
                <option
                  className="py-2 text-red-500 bg-gray-200 hover:bg-gray-300"
                  value="1"
                >
                  1 Month
                </option>
                <option
                  className="py-2 text-red-500 bg-gray-200 hover:bg-gray-300"
                  value="2"
                >
                  2 Months
                </option>
                <option
                  className="py-2 text-red-500 bg-gray-200 hover:bg-gray-300"
                  value="3"
                >
                  3 Months
                </option>
                <option
                  className="py-2 text-red-500 bg-gray-200 hover:bg-gray-300"
                  value="6"
                >
                  6 Months
                </option>
                <option
                  className="py-2 text-red-500 bg-gray-200 hover:bg-gray-300"
                  value="9"
                >
                  9 months
                </option>
                <option
                  className="py-2 text-red-500 bg-gray-200 hover:bg-gray-300"
                  value="12"
                >
                  year
                </option>
              </select>
            </div>
            <button className="bg-lime-600 rounded-full hover:bg-lime-700 text-white font-bold py-2 px-4  transition-colors mt-4">
              renew
            </button>
            <button
              onClick={() => handleClose()}
              className=" absolute  text-lg text-red-600 right-4 top-5 "
            >
              &#10005;
            </button>
          </form>
        </motion.div>
      </AnimatePresence>
    );
}

export default EditItems
