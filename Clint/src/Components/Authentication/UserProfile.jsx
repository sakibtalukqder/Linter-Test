import { onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebaseConfig";
import imgurl from '../../assets/Img/Untitled.png';


const UserProfile = () => {
  
  const user = JSON.parse(localStorage.getItem("User"));
  const Data = [user];
  console.log("LocalStorage User : ",Data);

  const nevigate = useNavigate();
  
  // Sinout Function
  const Sinout = () => {
    signOut(auth)
      .then((value) => {
        localStorage.removeItem("User");
        console.log(value);
        nevigate("/login");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Image Uploading 
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  function Upload(e) {
    const file = e.target.files[0];
    if (file.size >= 1048576 * 10) {
      return toast.error("Max Upload Size 4MB");
    } else {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  }

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

  const [userUpdate, setUserupdate] = useState();
  const [name,setName] = useState();

  // console.log("Current User : ",userUpdate);

  useEffect(() => {
    const User = onAuthStateChanged(auth, (user) => setUserupdate(user));
    return User;
  }, []);

  const UpdateProfile = async () => {
    const url = await UploadImage(image);
    console.log(url);
    await updateProfile(userUpdate, {
      displayName: name,
      photoURL: url,
    }).then((data) => {
      localStorage.removeItem("User")
      console.log("Updated User: ", data);
    }).catch((err) => {
      console.log(err.message);
    })

    try {
      const response = JSON.stringify(userUpdate)
      localStorage.setItem("User", response);
    } catch (error) {
      console.log(error);
    }
    window.location.reload();
  }

  return (
    <div className="flex flex-col items-center mt-8 ">
      <div>
        {
          Data.map((User, index) => (
            <div className="lg:py-20 pb-4" key={index}>
              <div className="hero (bg-slate-300) bg-gradient-to-r from-slate-300 via-slate-200 to-slate-100 w-full rounded shadow-2xl">
                <div className="hero-content flex-col lg:flex-row-reverse shadow-xl">
                  <figure className="w-72 h-72 overflow-hidden rounded flex justify-center items-center">
                    <img src={User.photoURL || imgurl} className="shadow-xl" />
                  </figure>
                  <div className="lg:mx-4 mx-0 flex flex-col justify-start items-start">
                    <div className="text-slate-950">
                      <h1 className="text-2xl lg:text-4xl font-bold">{User.displayName}</h1>
                      <p className="pb-4 lg:py-3">{User.email}</p>
                    </div>
                    <div className="flex w-full">
                      <div className="grid gap-2 grid-cols-2 mb-8 md:mb-0">
                      <button onClick={Sinout} className="btn btn-outline btn-error rounded-sm btn-sm">Sinout</button>
                        <button onClick={() => document.getElementById('my_modal_3').showModal()} className="btn btn-outline btn-accent rounded-sm btn-sm">Update Profile </button>
                      
                      </div>
                      <div>
                        <dialog id="my_modal_3" className="modal">
                          <div className="modal-box w-full max-w-2xl">
                            <form method="dialog">
                              {/* if there is a button in form, it will close the modal */}
                              <button className=" bt-sm btn-outline btn-error rounded-full h-8 w-8 btn-ghost absolute right-3 top-3">✕</button>
                            </form>
                            <div className="hero w-full rounded">
                              <div className="hero-content flex-col lg:flex-row-reverse">
                                <figure className=" w-60 h-60 overflow-hidden rounded flex justify-center items-center">
                                  <img src={preview || User.photoURL || imgurl} className="shadow-xl" />
                                </figure>
                                <div className="lg:mx-4 mx-0 flex flex-col justify-start items-start">
                                  <h1 className="text-xl lg:text-4xl font-bold w-full">{User.displayName}</h1>

                                  <input value={name} onChange={ (e) => setName(e.target.value) } className="text-xl lg:text-lg border w-full ps-1" type="text" placeholder="Enter Updated Name Here" />
                                  <p className="pb-4 lg:py-3">{User.email}</p>
                                  <div className="flex">

                                    <label htmlFor="upload" className="btn btn-outline w-1/2 btn-accent rounded-sm ms-0 btn-sm m-4 mb-12 lg:mb-0">Upload Image</label>
                                    <input type="file" id="upload" hidden accept="image/png, image/jpg, image/jpeg" onChange={Upload} />
                                    <button onClick={UpdateProfile} type="submit" className="btn w-1/2 btn-outline btn-accent rounded-sm ms-0 btn-sm m-4 mb-12 lg:mb-0">{loading ? "Updateing....." : "Submit"}</button>

                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </dialog>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default UserProfile;
