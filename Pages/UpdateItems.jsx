// import { useMutation, useQuery } from "@tanstack/react-query";
// import { UseData } from "../context/ContextP";
// import { Timestamp, doc, updateDoc,getDoc,getDocFromCache } from "firebase/firestore";
// import { db } from "../config/Firebase";
// import { useQueryClient } from "@tanstack/react-query";
// import { useForm } from "react-hook-form";
// import { useEffect, useRef } from "react";


// function Update({cus}) {
//     const {
//       selectedUpdateId,
//       setSelectedUpdateId,
//       openUpdateModal,
//       setOpenUpdateModal,
//     } = UseData();
//         const modalRef = useRef(null);
     
// async function selectCustomer(id) {
//   const docRef = doc(db, "customers", id);
//   try {
//     const docSnapshot = await getDoc(docRef);

//     if (docSnapshot.exists()) {
  
        
//       return docSnapshot.data();
//     } else {
//       throw new Error("Document does not exist!");
//     }
//   } catch (error) {
//     console.error("Error getting document:", error);
//     throw error;
//   }
// }
      

//     const queryClient = useQueryClient()
//     const {register,handleSubmit,setValue,getValues}= useForm()
//     // const { data, isLoading } = useQuery({
//     //   queryFn: () => selectCustomer(selectedUpdateId),
//     //   queryKey: ["customerDetails", cus?.id],
//     // });
    


//    const { data } = useQuery(["customerDetails", selectedUpdateId], () => {
//      const docRef = doc(db, "customers", cus.id);
//      return getDoc(docRef).then((docSnapshot) => docSnapshot.data());
//    });

//     const { mutate } = useMutation(
//       (data) => {
//         const customerDoc = doc(db, "customers", cus.id);
//         return updateDoc(customerDoc, { name: data.name, phone: data.phone });
//       },
//       {
//         onSuccess: () => {
//           queryClient.invalidateQueries(["customers"]);
//           setOpenUpdateModal(false);
//         },
//       }
//     );

//      function onSubmit(data) {
//       mutate(data);
//     }
//     function handleClose(e = null) {
//       if (e) {
//         e.stopPropagation();
//       }
//       setOpenUpdateModal(false);
//     }
// // useEffect(() => {
// //   if (cus && selectedUpdateId === cus.id) {
// //     if (data) {
// //       setValue("name", data.name);
// //       setValue("phone", data.phone);
// //     }
// //   }

// //   function handleClickOutside(e) {
// //     if (!modalRef.current.contains(e.target)) {
// //       setOpenUpdateModal(false);
// //     }
// //   }

// //   document.addEventListener("click", handleClickOutside);

// //   return () => {
// //     document.removeEventListener("click", handleClickOutside);
// //   };
// // }, [selectedUpdateId, data, cus, setValue, setOpenUpdateModal]);
//       if (!cus) {
//         return null;
//       }
        
//     return (
//       <div className="fixed inset-0 flex flex-col items-center justify-center z-50">
//         <div className="fixed inset-0 backdrop-filter backdrop-blur-sm bg-opacity-50 bg-gray-900"></div>
//         <form
//           ref={modalRef}
//           onSubmit={handleSubmit(onSubmit)}
//           className="bg-white relative  w-1/2 p-6 rounded shadow-lg flex gap-4 flex-col"
//         >
//           <h1 className="text-xl font-bold mb-4">Add Customer</h1>
//           <input
//             className=" py-2  rounded-lg  outline outline-lime-600  px-4  focus:outline-none focus:ring focus:ring-green-500 shadow-xl"
//             placeholder="name"
//             type="text"
//             defaultValue={data?.name}
//             {...register("name")}
//           />
//           <input
//             className=" py-2  rounded-lg  outline outline-lime-600  px-4  focus:outline-none focus:ring focus:ring-green-500  shadow-2xl"
//             placeholder="phone"
//             type="phone"
//             defaultValue={data?.phone}
//             required
//             {...register("phone")}
//           />
       
//           <button className="bg-lime-600 rounded-full hover:bg-lime-700 text-white font-bold py-2 px-4  transition-colors mt-4">
//             Add
//           </button>
//           <button
//             onClick={(e) => handleClose(e)}
//             className=" absolute  text-lg text-red-600 right-4 top-5 "
//           >
//             &#10005;
//           </button>
//         </form>
//       </div>
//     );
// }

// export default Update
// import { useState } from "react";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { useForm } from "react-hook-form";
// import { doc, updateDoc, getDoc } from "firebase/firestore";
// import { db } from "../config/Firebase";

// function Update({ cus }) {
//   const [open, setOpen] = useState(false);
//   const queryClient = useQueryClient();
//   const { register, handleSubmit, setValue } = useForm();
//   const { data } = useQuery(["customerDetails", cus?.id], async () => {
//     const docRef = doc(db, "customers", cus.id);
//     const docSnapshot = await getDoc(docRef);

//     if (docSnapshot.exists()) {
//       return docSnapshot.data();
//     } else {
//       throw new Error("Document does not exist!");
//     }
//   });

//   const { mutate } = useMutation(
//     (data) => {
//       const customerDoc = doc(db, "customers", cus.id);
//       return updateDoc(customerDoc, { name: data.name, phone: data.phone });
//     },
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries(["customers"]);
//         setOpen(false);
//       },
//     }
//   );

//   const onSubmit = (data) => {
//     mutate(data);
//   };

//   const handleOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   if (!cus) {
//     return null;
//   }

//   return (
//     <>
//       <button onClick={handleOpen}>Update Customer</button>

//       {open && (
//         <div>
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <input
//               type="text"
//               defaultValue={data?.name}
//               {...register("name")}
//             />
//             <input
//               type="text"
//               defaultValue={data?.phone}
//               {...register("phone")}
//             />
//             <button type="submit">Update</button>
//             <button type="button" onClick={handleClose}>
//               Cancel
//             </button>
//           </form>
//         </div>
//       )}
//     </>
//   );
// }

// export default Update
import { useMutation, useQuery } from "@tanstack/react-query";
import { UseData } from "../context/ContextP";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../config/Firebase";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { AnimatePresence, motion } from "framer-motion";

function Update() {
  const { selectedUpdateId, setOpenUpdateModal,setSearch,openUpdateModal } = UseData();
  const queryClient = useQueryClient();
  const { register, handleSubmit, setValue } = useForm();
  const formRef = useRef(null)

  const { data:userData } = useQuery(["customerDetails", selectedUpdateId], () => {
    const docRef = doc(db, "customers",selectedUpdateId);
    return getDoc(docRef).then((docSnapshot) => docSnapshot.data());
  });

  const { mutate } = useMutation(
    (data) => {
      const customerDoc = doc(db, "customers",selectedUpdateId);
      return updateDoc(customerDoc, { name: data.name, phone: data.phone });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["customers"]);
        setOpenUpdateModal(false);
          setSearch("");
          toast.success("updated successfully");
      },
      onError:()=> {
         toast.error("Could not update");
      }

    }
  );
  useEffect(() => {
    if (userData) {
      setValue("name", userData.name);
      setValue("phone", userData.phone);
    }
  }, [userData, setValue]);

const onSubmit = (data) => {
  // Retrieve the existing name and phone number from the fetched data
  const existingName = userData?.name;
  const existingPhone = userData?.phone;

  // Check if the name and phone number are empty
  if (!data.name && !data.phone) {
    // If both fields are empty, assign the existing values back to the form values
    data.name = existingName;
    data.phone = existingPhone;
  } else if (!data.name) {
    // If the name field is empty, use the existing name value
    data.name = existingName;
  } else if (!data.phone) {
    // If the phone field is empty, use the existing phone value
    data.phone = existingPhone;
  }

  const updatedData = {
    name: data.name,
    phone: data.phone,
  };

  mutate(updatedData);
};
    useEffect(() => {
      function handleClickOutside(e) {
        if (!formRef.current.contains(e.target)) {
          setOpenUpdateModal(false);
        }
      }

      document.addEventListener("click", handleClickOutside);

      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }, [openUpdateModal]);


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
          onClick={(e) => e.stopPropagation()}
          ref={formRef}
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white relative  w-1/2 p-6 rounded shadow-lg flex gap-4 flex-col"
        >
          <h1 className="text-xl font-bold mb-4">Update Customer</h1>
          <input
            className="py-2 rounded-lg outline outline-lime-600 px-4 focus:outline-none focus:ring focus:ring-green-500 shadow-xl"
            placeholder="name"
            type="text"
            defaultValue={userData?.name}
            {...register("name")}
          />
          <input
            className="py-2 rounded-lg outline outline-lime-600 px-4 focus:outline-none focus:ring focus:ring-green-500 shadow-2xl"
            placeholder="phone"
            type="phone"
            defaultValue={userData?.phone}
            required
            {...register("phone")}
          />

          <button className="bg-lime-600 rounded-full hover:bg-lime-700 text-white font-bold py-2 px-4 transition-colors mt-4">
            Update
          </button>
          <button
            type="button"
            onClick={() => setOpenUpdateModal(false)}
            className="absolute text-lg text-red-600 right-4 top-5"
          >
            &#10005;
          </button>
        </form>
      </motion.div>
    </AnimatePresence>
  );
}

export default Update;