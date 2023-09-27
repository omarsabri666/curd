import { useForm } from "react-hook-form";
import { addDoc, Timestamp } from "firebase/firestore";
import { customerCollectionRef } from "../config/Firebase";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { UseData } from "../context/ContextP";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import { AnimatePresence, motion } from "framer-motion";

function Modal() {
  const { handleSubmit, register } = useForm();
  const { setOpenModal, setSearch } = UseData();
  const modalRef = useRef(null);

  const queryClient = useQueryClient();
  const [isShowing, setIsShowing] = useState(true);

  const { mutate } = useMutation(
    (data) => {
  
      const durationInMonths = parseInt(data.duration);
      const currentDate = Timestamp.now();
      const endDate = new Date(
        currentDate.toMillis() + durationInMonths * 30 * 24 * 60 * 60 * 1000
      ); // Calculate the end date by adding the duration in milliseconds
      const newData = {
        ...data,
        startDate: currentDate,
        endDate,
      };
      return addDoc(customerCollectionRef, newData);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["customers"]);
        setOpenModal(false);
        setSearch("");
        toast.success("customer was added successfully");
      },
      onError: () => {
        toast.error("couldnt add customer");
      },
    }
  );

  async function onSubmit(data) {
    mutate(data);
  }

  useEffect(() => {
    function handleClickOutside(e) {
      if (!modalRef.current.contains(e.target)) {
        setOpenModal(false);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  function handleClose(e = null) {
    if (e) {
      e.stopPropagation();
      setIsShowing(false);
    }
    setOpenModal(false);
  }

  return (
    <AnimatePresence>
      {isShowing && (
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
            <h1 className="text-xl font-bold mb-4">Add Customer</h1>
            <input
              className=" py-2  rounded-lg  outline outline-lime-600  px-4  focus:outline-none focus:ring focus:ring-green-500 shadow-xl"
              placeholder="name"
              type="text"
              {...register("name")}
            />
            <input
              className=" py-2  rounded-lg  outline outline-lime-600  px-4  focus:outline-none focus:ring focus:ring-green-500  shadow-2xl"
              placeholder="phone"
              type="phone"
              required
              {...register("phone")}
            />
            <div>
              <label htmlFor="duration"></label>
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
                  1Month
                </option>
                <option
                  className="py-2 text-red-500 bg-gray-200 hover:bg-gray-300"
                  value="2"
                >
                  2Months
                </option>
                <option
                  className="py-2 text-red-500 bg-gray-200 hover:bg-gray-300"
                  value="3"
                >
                  3Months
                </option>
                <option
                  className="py-2 text-red-500 bg-gray-200 hover:bg-gray-300"
                  value="6"
                >
                  6Months
                </option>
                <option
                  className="py-2 text-red-500 bg-gray-200 hover:bg-gray-300"
                  value="9"
                >
                  9months
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
              Add
            </button>
            <button
              onClick={(e) => handleClose(e)}
              className=" absolute  text-lg text-red-600 right-4 top-5 "
            >
              &#10005;
            </button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Modal;
