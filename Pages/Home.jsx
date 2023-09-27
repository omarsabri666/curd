import { getDocs, collection } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "../config/Firebase";
import { useQuery } from "@tanstack/react-query";
import Items from "./Items";
import { UseData } from "../context/ContextP";
import Modal from "./Modal";
import EditItems from "./EditItems";
import { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { ToastContainer } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";

import { BsPersonAdd } from "react-icons/bs";


function Home() {

  const { openModal, setOpenModal, openRenewModal, search} =
    UseData();
  const [filteredData, setFilteredData] = useState([]);
    function openModalFN(e) {
 
      e.stopPropagation();
      setOpenModal(true);
    }


  async function fetchItems() {
    try {
      const customersCollectionRef = collection(db, "customers");
      const data = await getDocs(customersCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      return filteredData;
    } catch (err) {
      console.error(err);
    
      throw err; // Rethrow the error to be caught by useQuery
    }
  }

  const { data, isLoading, isError } = useQuery(["customers"], fetchItems);

  useEffect(() => {
    function handleSearch() {
      if (search === "") {
        setFilteredData(data);
      } else {
        const filtered = data.filter((cus) =>
          cus.name.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredData(filtered);
      }
    }
    handleSearch();
  }, [search, data]);



  if (isLoading) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center items-center mx-auto text-center my-5"
        >
          <div className="text-center justify-center items-center">
            <RotatingLines
              strokeColor="grey"
              strokeWidth="5"
              animationDuration="0.75"
              width="96"
              visible={true}
            />
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  if (isError) {
    return (
      <div className="justify-center items-center mx-auto my-5 text-center">
        <h2 className="text-xl text-red-600">Could not get data</h2>
      
      </div>
    );
  }

  return (
    <div className="my-6 flex flex-col">
      <button
        onClick={(e) => openModalFN(e)}
        className="py-2 px-3 self-end my-4 bg-white outline outline-lime-600 text-black hover:bg-lime-600 transition-colors  disabled:opacity-50 disabled:cursor-not-allowed   rounded-full hover:text-white"
      >
        <BsPersonAdd size={25} />
      </button>

      {openModal && (
        <>
          <Modal /> <ToastContainer />{" "}
        </>
      )}
      {openRenewModal && <EditItems />}

      <div className="flex gap-2 flex-col">
        {filteredData?.map((cus) => (
          <div key={cus.id}>
            <Items key={cus.id} cus={cus} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
