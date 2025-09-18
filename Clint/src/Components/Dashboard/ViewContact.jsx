import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import HashLoader from "react-spinners/HashLoader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import imgUrl from '../../assets/Img/Untitled.png';


const baseUrl = import.meta.env.VITE_API_URL;


const ViewContact = () => {

  const nevigate = useNavigate();
  const [loading, setLoading] = useState();


  // Fetch User Data 
  const [Data, setData] = useState([]);
  const { id } = useParams();
  const getData = async () => {
    setLoading(true);
    try {
      const responce = await fetch(`${baseUrl}/route/get/${id}`)
      const Data = await responce.json();
      setData([Data]);
      console.log(Data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  // Delete Function 
  async function Delete(ID) {
    setLoading(true);
    const responce = await fetch(`${baseUrl}/route/del/${ID}`, {
      method: "DELETE",
    });
    const delResult = await responce.json();
    if (!responce.ok) {
      console.log(delResult.error);
    }
    if (responce.ok) {
      console.log("Deleted", responce.ok);
      setTimeout(() => {
        getData();
        setError("");
        setLoading(false);
      }, 1000);
      toast.success("Deleted Successfully !");
      nevigate("/dash");
    }
  }


  return (
    <>
      <div className="flex flex-col items-center mt-8 ">
        {
          loading && (
            <div className="flex items-center justify-center py-24">
              <HashLoader
                color={"#36d7b7"}
                loading={loading}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          )
        }
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
        {
          Data.map((User,idx) => (
            <div className='lg:py-20 pb-4' key={idx}>
              <div className="hero border w-full rounded shadow-2xl">
                <div className="hero-content flex-col lg:flex-row-reverse shadow-xl">
                  <figure className="w-60 h-60 overflow-hidden rounded flex justify-center items-center shadow-2xl">
                    <img src={User.image || imgUrl} className="shadow-xl" />
                  </figure>
                  <div className="lg:mx-4 mx-0 flex flex-col justify-start items-start ">
                    <h1 className="text-2xl lg:text-5xl font-bold">{User.Name}</h1>
                    <p className='text-lg py-2 font-bold'><span className=" font-light">Email :</span> {User.Email}
                      <br />
                      <span className=" font-light">Contact :</span> 0{User.Phoen_No}</p>
                    <br />
                    <div className='flex'>
                      <button onClick={() => Delete(User._id)} className=" btn btn-sm btn-outline btn-error rounded-sm my-4 mb-12 lg:mb-0">Delete</button>
                      <Link to={`/dash/${User._id}`} className=" btn btn-sm btn-outline btn-accent ms-4 rounded-sm my-4 mb-12 lg:mb-0">Update</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </>
  );
};

export default ViewContact;