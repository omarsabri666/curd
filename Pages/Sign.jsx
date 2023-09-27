import { useForm } from "react-hook-form";
import {BsGoogle} from "react-icons/bs"
import {onAuthStateChanged} from "firebase/auth"

import { signInWithEmailAndPassword, signInWithPopup} from "firebase/auth"
import { auth,googleProvider } from "../config/Firebase";
import { UseData } from "../context/ContextP";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";

function Sign() {
    const {register,reset,handleSubmit} = useForm()
    const { signIn,   } = UseData();
    const [error,setError] = useState("")
    const navigate = useNavigate()
    const [loading , setLoading] = useState(false)
   onAuthStateChanged(auth, (user) => {
     if (user) {
       // User is signed in.
      


       // You can access user information such as user.uid, user.displayName, user.email, etc.
     } else {
       // User is signed out.
   
     }
   });

    async function onSubmit(data){
        try {
          setLoading(true)
            
            const { email, Password } = data;
          
           await signInWithEmailAndPassword(auth, email, Password);
            signIn(email);
            
          
            setError("")
            reset();
            toast.success("signed in successfully");
            navigate("/home")

            
          

        } catch (error) {
            setError(error.message)
            setLoading(false)
             

        } finally{
          setLoading(false)
        }


    }
    async function handelSigninWithGoogle(){
         try {
           await signInWithPopup(auth, googleProvider);
           toast.success("signed in successfully");
           navigate("/home");

         } catch (err) {
           console.error(err);
     
         }

    } 
    return (
      <AnimatePresence>
        <motion.form
          initial={{ translateX: -1000, opacity: 0, scale: 0.5 }}
          animate={{ translateX: 0, opacity: 1, scale: 1 }}
          exit={{ translateX: -1000, opacity: 0 }}
          transition={{ duration: 0.4 }}
          onSubmit={handleSubmit(onSubmit)}
          className="     my-16 "
        >
          <div className="  max-w-xl  rounded-lg  mx-auto  shadow-xl">
            <div className=" gap-2 max-w-lg mx-auto  flex-wrap flex flex-col">
              {loading && (
                <div className=" justify-center items-center mx-auto text-center">
                  <RotatingLines
                    strokeColor="grey"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="96"
                    visible={true}
                  />
                </div>
              )}
              <h2 className=" text-center text-xl font-bold">Login</h2>
              <div className=" flex flex-col gap-1">
                <label className=" font-semibold" htmlFor="email">
                  Email Address
                </label>
                <input
                  className="  py-2  rounded-lg  px-4  focus:outline-none focus:ring focus:ring-green-500 shadow-xl "
                  placeholder="Example@gmail.com"
                  id="email"
                  type="email"
                  {...register("email")}
                />
              </div>
              <div className=" flex flex-col gap-1">
                <label className="  font-semibold" htmlFor="password">
                  password
                </label>
                <input
                  className=" py-2  px-4 rounded-lg   focus:outline-none focus:ring focus:ring-green-500 shadow-xl "
                  id="password"
                  placeholder="your Password"
                  type="password"
                  {...register("Password")}
                />
              </div>
              <div></div>
              <button
                disabled={loading}
                type="submit"
                className=" bg-green-600 py-2 px-4 disabled:opacity-50 disabled:cursor-not-allowed  my-4 text-center shadow-md rounded-lg text-white  hover:bg-green-500 transition-colors"
              >
                login
              </button>
              <h4 className=" text-center mb-1">or</h4>
              <button
                onClick={handelSigninWithGoogle}
                className=" flex items-center justify-center  my-4 bg-[#d85040] py-2 px-4 hover:bg-[#e85645] transition-colors text-white rounded-lg"
              >
                <span className=" pr-8">
                  <BsGoogle />
                </span>{" "}
                Login with Google
              </button>
              <div className=" justify-end  self-end">
                <h3 className=" my-4 ">
                  dont have an account ?
                  <Link
                    className=" cursor-pointer text-blue-500"
                    to="/createacc"
                  >
                    {" "}
                    sign up{" "}
                  </Link>{" "}
                </h3>
              </div>
              {error && (
                <div className="  justify-center  items-center ">
                  <h2 className=" text-red-600 text-center my-4">{error}</h2>
                </div>
              )}
            </div>
          </div>
        </motion.form>
      </AnimatePresence>
    );
}

export default Sign
