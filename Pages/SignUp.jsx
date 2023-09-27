import { useState } from "react";
import { useForm } from "react-hook-form";

import {createUserWithEmailAndPassword, signOut} from "firebase/auth"
import { auth } from "../config/Firebase";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";

function SignUp() {
    const {register,reset , handleSubmit}= useForm()
     const [error, setError] = useState("");
     const navigate = useNavigate()
 
    async function onSubmit(data) {
      try {
        const { email, Password } = data;

        await createUserWithEmailAndPassword(auth, email, Password);
        await signOut(auth); // Sign out the user after sign-up

        setError("");
        toast.success("account was created successfully");
      } catch (error) {
        setError(error.message);
        toast.error("could not create an account");
      }

      reset();
      navigate("/sign");
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
              <h2 className=" text-center text-xl font-bold">Sign Up</h2>
              <div className=" flex flex-col gap-1">
                <label className=" font-semibold" htmlFor="email">
                  Email Address
                </label>
                <input
                  required
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
                  required
                  minLength={7}
                  maxLength={50}
                  className=" py-2  px-4 rounded-lg   focus:outline-none focus:ring focus:ring-green-500 shadow-xl "
                  id="password"
                  placeholder="your Password"
                  type="password"
                  {...register("Password")}
                />
              </div>
              <div></div>
              <button
                type="submit"
                className=" bg-green-600 py-2 px-4  my-4 text-center shadow-md rounded-lg text-white  hover:bg-green-500 transition-colors"
              >
                Sign Up
              </button>

              <div className=" justify-end  self-end">
                <h3 className=" my-4 ">
                  <Link className=" cursor-pointer text-blue-500" to="/sign">
                    {" "}
                    sign in{" "}
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

export default SignUp
