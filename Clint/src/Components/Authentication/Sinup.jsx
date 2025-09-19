import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, GoogleProvider } from "./firebaseConfig";
import { ToastContainer, toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";
import Default from '../../assets/Img/Untitled.png';


const Sinup = () => {

  const nevigate = useNavigate();
  const [preview, setPreview] = useState();
  const [image, setImage] = useState();
  const [loading, setLoading] = useState();

  // Image Upload Preview 
  const uploadImg = (e) => {
    const imgUrl = e.target.files[0];
    if (imgUrl.size >= 1048576 * 4) {
      toast.error("Max Upload Size 4MB");
    } else {
      setImage(imgUrl);
      setPreview(URL.createObjectURL(imgUrl));
    }
  }

  // Post to Cludinary 
  async function UploadImage() {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "sjxeivct");
    try {
      setLoading(true);
      let res = await fetch(
        "https://api.cloudinary.com/v1_1/daoltrjyw/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const urlData = await res.json();
      setLoading(false);
      return urlData.url;
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }


  // Sinup With Email & Password
  const CreateUser = async (e) => {
    e.preventDefault();

    const name = e.target.fullname.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const cpass = e.target.cpas.value;

    const url = await UploadImage(image);

    if (password == cpass) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((data) => {
          const user = data.user;
          updateProfile(user, {
            displayName: name,
            photoURL: url,
          });
          toast.success("Sinup Successfull....!!");
          nevigate("/login");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Sinup Unsuccessfull....!!");
        });
    } else {
      toast.error("Password Not Matched....!!");
    }
  };

  // Sinup With Google Provider
  const GoogleSinup = () => {
    signInWithPopup(auth, GoogleProvider).then((data) => {
      console.log(data);
      nevigate('/');
      window.location.reload();
    })
      .catch((err) => {
        console.log(err);
      })
  };


  return (
    <>
      {
        loading ?
          <div className="flex items-center justify-center py-24">
            <HashLoader
              color={"#36d7b7"}
              loading={loading}
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
          :
          <>
            <br />
            <div className="hero py-4 bg-base-200">
              <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
              <div className="hero-content flex-col lg:flex-row">
                <div className="text-center flex items-center lg:items-start flex-col lg:text-left lg:w-1/2">
                  <div className="">
                    <figure className="h-64 w-64 overflow-hidden rounded">
                      <img src={preview || Default} alt="" />
                    </figure>
                    <label htmlFor="imageInput" className="btn btn-outline btn-sm w-64 my-4">{loading ? "Uploading......" : "Upload Image"}</label>
                    <input onChange={uploadImg} type="file" hidden id="imageInput" accept="image/jpg, image/jpeg, image/png" />
                  </div>
                  <>
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    <div className=" text-sm">
                      <p className="text-sm font-light">
                        Already have an account?
                        <Link to="/login" className="font-medium ms-2 text-blue-500 hover:underline dark:text-blue-700">
                          Login here
                        </Link>
                      </p>
                    </div>
                  </>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl rounded bg-base-100">
                  <div className="card-body">
                    <form className="" onSubmit={(e) => CreateUser(e)}>
                      <div className="mb-8 text-3xl text-center">Sign up</div>
                      <input
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="fullname"
                        placeholder="Full Name"
                      />
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
                      <input
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="cpas"
                        placeholder="Confirm Password"
                      />
                      <button
                        type="submit"
                        className=" btn btn-active btn-primary w-full text-center py-3 rounded bg-green hover:bg-green-dark focus:outline-none my-1 mb-2"
                      >
                        Create Account
                      </button>
                    </form>

                    <button
                      onClick={GoogleSinup}
                      className="flex items-center btn btn-outline btn-info w-full"
                    >
                      <svg aria-hidden="true" className="native svg-icon iconGoogle" width="18" height="18" viewBox="0 0 18 18" >
                        <path fill="#4285F4" d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18Z" ></path>
                        <path fill="#34A853" d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17Z" ></path>
                        <path fill="#FBBC05" d="M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18l2.67-2.07Z" ></path>
                        <path fill="#EA4335" d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.77 4.77 0 0 1 4.48-3.3Z" ></path>
                      </svg>
                      Sign up using Google
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
      }
    </>
  );
};

export default Sinup;


