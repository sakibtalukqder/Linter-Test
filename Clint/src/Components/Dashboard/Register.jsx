import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HashLoader from "react-spinners/HashLoader";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const baseUrl = import.meta.env.VITE_API_URL;

const Register = () => {

    // Image Upload
    const imgUrl =
        "https://media.istockphoto.com/id/587805038/vector/profile-picture-vector-illustration.jpg?s=612x612&w=0&k=20&c=soUW134LXdq5F9LcRtniX--ZOPNQqTdhQJrewQiZsf4=";

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState();

    const nevigate = useNavigate();

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
        setLoading(true);
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "sjxeivct");
        try {
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

    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [Phoen_No, setPhoen_No] = useState(0);
    const [Error, setError] = useState("");

    const user = JSON.parse(localStorage.getItem("User"));
    const UserId = user.uid;
    console.log("User id : ", UserId);

    const Submit = async (e) => {

        e.preventDefault();

        const url = await UploadImage(image);
        console.log(url);

        setLoading(true);
        const NewUser = { Name, Email, image: url, Phoen_No, uid: UserId }
        console.log(NewUser);

        const responce = await fetch(`${baseUrl}/route/cr`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(NewUser),
        })

        const result = await responce.json();
        if (!responce.ok) {
            console.log(result.error);
            setError(result.error);
            toast.error('An Error Detected !', result.error);
            setLoading(false);
        }
        if (responce.ok) {
            toast.success("Submitted Successfully")
            console.log(result);
            setName("");
            setEmail("");
            setPhoen_No(0);
            setError("");
            setLoading(false);
            nevigate('/dash');
        }

    }

    console.log(Error);

    return (
        <div>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
            <h1 className='text-center py-2 text-white text-3xl underline font-bold bg-orange-500'>Add a New Contact</h1>
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

                    <div className="hero min-h-full lg:py-20 w-auto bg-base-200">
                        <div className="hero-content py-4 lg: flex-col lg:flex-row-reverse">
                            <div className="flex items-center flex-col">
                                <figure className="w-52 h-52 lg:w-80 lg:h-80 rounded overflow-hidden" >
                                    <img
                                        src={preview || imgUrl}
                                        alt="Insert Image"
                                    />
                                </figure>
                                <br />
                                <div className="flex items-center my-6 w-full justify-center h-7">
                                    <label htmlFor="upload" className="btn btn-outline btn-accent w-full h-full">
                                        Upload Image
                                    </label>
                                    <input
                                        type="file"
                                        id="upload"
                                        hidden
                                        accept="image/png, image/jpg, image/jpeg"
                                        onChange={Upload}
                                    />
                                </div>
                                <br />

                            </div>
                            <div className="flex justify-center">
                                <form className="w-80 p-6 shadow-lg rounded-lg" onSubmit={Submit}>
                                    <h2 className="text-2xl font-semibold mb-4">Create New Contact</h2>
                                    <div className="mb-4">
                                        <label htmlFor="name" className="block text-sm font-medium mb-1">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            value={Name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full h-9 ps-4 rounded"
                                            placeholder="Enter Contact name"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="email" className="block text-sm font-medium mb-1">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            value={Email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full h-9 ps-4 rounded"
                                            placeholder="Enter Contact email"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="Phoen_No" className="block text-sm font-medium mb-1">
                                            Phone No
                                        </label>
                                        <input
                                            type="text"
                                            value={Phoen_No}
                                            onChange={(e) => setPhoen_No(e.target.value)}
                                            className="w-full h-9 ps-4 rounded"
                                            placeholder="Enter Contact No"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full mt-8 bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 transition duration-300"
                                    >
                                        {loading ? "Submitting ...." : "Submit"}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
            }
        </div>
    );
};

export default Register;