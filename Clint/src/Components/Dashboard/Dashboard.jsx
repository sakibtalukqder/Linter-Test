import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import HashLoader from "react-spinners/HashLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// const baseUrl = "http://localhost:2023"
const baseUrl = "https://frienemie-phoenbook.onrender.com"

const Dashboard = () => {
  const [Data, setData] = useState([]);
  const [error, setError] = useState();

  const [loading, setLoading] = useState();

  async function getData() {
    setLoading(true);
    const response = await fetch(`${baseUrl}/route/rd`);
    const result = await response.json();
    console.log("result..", result);
    if (!response.ok) {
      console.log(result.Error);
    }
    if (response.ok) {
      console.log(response.ok);
      setData(result);
      setError("");
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

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
    }
  }

  return (
    <>
      <h1 className="text-center mb-4 py-2 text-3xl underline text-white font-bold bg-green-500 ">
        All Contact
      </h1>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
      {
        loading ? (
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
          :
          <>
            <div className="grid grid-flow-row-dense grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Data.map((user, index) => (
                <div key={index} className=" flex items-center justify-center">
                  <div className="w-full max-w-sm  border border-gray-200 rounded-lg shadow">
                    <div className="flex justify-end px-4 pt-4">
                      <div className="dropdown dropdown-end dropdown-hover left-0">
                        <label tabIndex={0} className="btn btn-outline m-1 abslute btn-sm rounded">
                          <span className="sr-only">Open dropdown</span>
                          <svg
                            className="w-4 h-4"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 16 3"
                          >
                            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                          </svg>
                        </label>
                        <ul
                          tabIndex={0}
                          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                        >
                          <li>
                            <Link
                              className="btn-outline btn-primary"
                              to={`/dash/${user._id}`}
                            >
                              <button className="inline-flex items-center text-center">
                                Update Contact
                              </button>
                            </Link>
                          </li>

                          <li>
                            <Link
                              className="btn-outline btn-success"
                              to={`/dash/view/${user._id}`}
                            >
                              <button className="  inline-flex items-center text-center">
                                View Contact
                              </button>
                            </Link>
                          </li>

                          <li>
                            <button
                              className=" btn-outline btn-error inline-flex items-center font-medium text-center "
                              onClick={() => Delete(user._id)}
                            >
                              Delete Contact
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="flex flex-col items-center pb-10">
                      <figure className="w-40 h-40 lg:w-52 lg:h-52 mb-3 rounded shadow-lg overflow-hidden">
                        <img
                          src={user.image}
                          alt="Bonnie image"
                        />
                      </figure>
                      <h5 className="mb-1 font-bold text-2xl">{user.Name}</h5>
                      <span className=" text-black-500">Email: {user.Email}</span>
                      <span className=" text-black-500">
                        Contact No: 0{user.Phoen_No}
                      </span>
                      <div className="flex mt-4 space-x-3 md:mt-6"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
      }
      <div className="flex items-center justify-center py-8">
        <Link to="/reg" className=" btn btn-outline btn-accent">Add New Contract</Link>
      </div>
    </>
  );
};

export default Dashboard;