import { onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleProvider, auth } from "./firebaseConfig";
import { ToastContainer, toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";


const Login = () => {

  const [loading, setLoading] = useState();
  const nevigate = useNavigate();

  // Login With Email & Password 
  const SinIn = (e) => {

    e.preventDefault();
    setLoading(true);
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((data) => {
        console.log("Firebase Data", data.user);
        const userData = JSON.stringify(data.user);
        localStorage.setItem("User", userData);
        toast.success("Login Succesfull....!!");
        nevigate("/");
        window.location.reload();
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Login Unsuccesfull....!!");
        setLoading(false);
      });
  };

  // Login With Google 
  const GooglrSinup = () => {
    setLoading(true);
    signInWithPopup(auth, GoogleProvider).then((data) => {
      console.log(data.user);
      const Data = JSON.stringify(data.user);
      localStorage.setItem("User", Data);
      nevigate('/');
      window.location.reload();
      setLoading(false);
    })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      })
  }

  return (
    <div className="bg-grey-lighter mt-8 flex flex-col">
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">

        {
          loading ?
            <div className="flex items-center justify-center py-24">
              <HashLoader
                color={"#36d7b7"}
                loading={loading}
                size={100}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
            :
            <>
              <div className=" bg-transparent px-6 py-8 rounded shadow-md dark:text-blavk w-full">
                <form onSubmit={(e) => SinIn(e)}>
                  <h1 className="mb-8 text-3xl text-center">Login</h1>

                  <input
                    type="text"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    name="email"
                    placeholder="Email"
                  />

                  <input
                    type="password"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    name="password"
                    placeholder="Password"
                  />

                  <button
                    type="submit"
                    className=" btn btn-active btn-primary w-full text-center py-3 rounded bg-green hover:bg-green-dark focus:outline-none my-1 mb-5"
                  >
                    Login
                  </button>
                </form>
                <button onClick={GooglrSinup} className="flex items-center btn btn-outline btn-info w-full">
                  <svg
                    aria-hidden="true"
                    className=" m-3 native svg-icon iconGoogle"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                  >
                    <path
                      fill="#4285F4"
                      d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18Z"
                    ></path>
                    <path
                      fill="#34A853"
                      d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17Z"
                    ></path>
                    <path
                      fill="#FBBC05"
                      d="M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18l2.67-2.07Z"
                    ></path>
                    <path
                      fill="#EA4335"
                      d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.77 4.77 0 0 1 4.48-3.3Z"
                    ></path>
                  </svg>
                  Login With Google
                </button>
                <div className=" text-sm mt-4">
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Dont have an account?{" "}
                    <Link
                      to="/sinup"
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Sign Up here
                    </Link>
                  </p>
                </div>
              </div>
            </>
        }

      </div>
    </div>
  );
};

export default Login;
