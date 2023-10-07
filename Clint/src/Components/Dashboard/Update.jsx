import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import HashLoader from "react-spinners/HashLoader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Update = () => {

    const [image, setImage] = useState(null);
    const [uploading, setUpliading] = useState(false);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(null);

    function Upload(e) {
        const file = e.target.files[0];
        if (file.size >= 1048576 * 4) {
            return toast("Max Upload Size 4MB");
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
            setUpliading(true);
            let res = await fetch(
                "https://api.cloudinary.com/v1_1/daoltrjyw/image/upload",
                {
                    method: "POST",
                    body: data,
                }
            );
            const urlData = await res.json();
            setUpliading(false);
            return urlData.url;
        } catch (error) {
            setUpliading(false);
            console.log(error);
        }
    }

    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [Phoen_No, setPhoen_No] = useState(0);

    const Nevigate = useNavigate();
    const [Error, setError] = useState();

    const { id } = useParams();
    const getData = async () => {

        setLoading(true);
        const responce = await fetch(`http://localhost:2023/route/get/${id}`)
        const result = await responce.json();

        if (responce.ok) {
            setName(result.Name);
            setEmail(result.Email);
            setPhoen_No(result.Phoen_No);
            setImage(result.image);
            setLoading(false);
        } else {
            console.log(responce.error);
            setLoading(false);
        }
    }

    useEffect(() => {
        getData();
    }, [])


    const Update = async (e) => {

        e.preventDefault();

        setLoading(true);
        const url = await UploadImage(image);
        console.log(url);

        const updatedUser = { Name, Email, Phoen_No, image: url };
        // console.log(updatedUser);
        const response = await fetch(`http://localhost:2023/route/get/up/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedUser),
        });

        const result = await response.json();
        if (response.ok) {
            toast.success('Update Successfully !');
            console.log("updated result..", result);
            setError("");
            Nevigate("/dash");
            setLoading(false);
        }
        if (!response.ok) {
            console.log(response.error);
            setError(response.error);
            toast.error('An Error Detected !');
            setLoading(false);
        }
    };



    return (
        <div>
            <ToastContainer />
            <h1 className='text-center text-3xl py-2 text-white underline font-bold bg-purple-500'>Update Your Contact</h1>
            {
                loading || uploading ? (
                    <div className="flex items-center justify-center py-24">
                        <HashLoader
                            color={"#36d7b7"}
                            loading={loading}
                            size={100}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </div>
                )
                    :
                    <div className="hero min-h-full md:py-20 lg:py-20 bg-base-200">
                        <div className="hero-content flex-col lg:flex-row-reverse">
                            <div>
                                <figure className="w-52 h-52 lg:w-80 lg:h-80 rounded overflow-hidden" >
                                    <img
                                        src={preview || image}
                                        alt="Insert Image"
                                    />
                                </figure>
                                <div className="flex items-center my-6 justify-center h-5">
                                    <label htmlFor="upload" className="btn btn-outline btn-accent w-full h-5">
                                        Upload New Image
                                    </label>
                                    <input
                                        type="file"
                                        id="upload"
                                        hidden
                                        accept="image/png, image/jpg, image/jpeg"
                                        onChange={Upload}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <form className="w-80 p-6 shadow-lg rounded-lg" onSubmit={Update}>
                                    <h2 className="text-2xl font-semibold mb-4">Update Your Data</h2>
                                    <div className="mb-4">
                                        <label htmlFor="name" className="block text-sm font-medium mb-1">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            value={Name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full h-9 ps-4 rounded"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="email" className="block text-sm font-medium mb-1">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            value={Email}
                                            onChange={(e) => { setEmail(e.target.value) }}
                                            className="w-full h-9 ps-4 rounded"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="Phoen_No" className="block text-sm font-medium mb-1">
                                            Phoen No
                                        </label>
                                        <input
                                            type="text"
                                            value={Phoen_No}
                                            onChange={(e) => setPhoen_No(e.target.value)}
                                            className="w-full h-9 ps-4 rounded"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full mt-8 bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 transition duration-300"
                                    >
                                        {uploading ? "Update ...." : "Update"}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
            }

        </div>
    );
};

export default Update;