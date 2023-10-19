import React from 'react';
import { Link } from 'react-router-dom';
import ImgSrc from '../../assets/Img/Untitled.png';

const Data = [
    {
        Name: "Sakib Talukqder",
        Role: "Founder & Developer",
        Email: "sakibtalukqder07@gmail.com",
        image: "https://res.cloudinary.com/daoltrjyw/image/upload/v1697469068/huoq2an8nnssszgrpc1a.jpg",
        Facebook: "https://www.facebook.com/sakibtalukqder",
        Talegram: "https://t.me/sakibtalukqder",
        Github: "https://github.com/sakibtalukqder",
        Instagram: "https://www.instagram.com/sakibtalukqder/",
    },
    {
        Name: "Al-amin",
        Role: "Assistant Developer",
        Email: "sakibtalukqder07@gmail.com",
        image: "https://res.cloudinary.com/daoltrjyw/image/upload/v1697469041/yyvmoav1gkyx4fpd7lqb.jpg",
        Facebook: "",
        Talegram: "",
        Github: "",
        Instagram: "",
    },
]


const TeamMembers = () => {

    return (
        <div className='my-4'>
            <br />
            <hr className="w-1/2 h-1 bg-orange-500 mx-auto mb-8 rounded-full" />
            <section className="">
                <div className="container px-6 mx-auto">
                    <div className="lg:flex xL:-mx-4 py-8">
                        <div className="lg:w-1/2 lg:mx-12">
                            <h1 className="text-3xl font-semibold lg:text-4xl ">Meet Our Support Team</h1>
                            <p className="max-w-2xl mt-4  ">
                                At Frienemie, we take pride in providing exceptional customer support to our valued clients. Our dedicated support team is here to ensure your experience with our products and services is smooth, and hassle-free. <br />
                                <span className=' text-red-400 font-bold'>Customer-Centric Approach:</span> We are committed to putting our customers first. Your satisfaction is our top priority, and we're always ready to go the extra mile to meet your needs.
                            </p>
                        </div>
                        <div className='lg:mx-auto grid grid-cols-1 lg:w-1/2'>
                            {
                                Data.map((User) => (
                                    <div className='flex flex-col items-center mt-9 lg:mt-4 border md:border-none'>
                                        <div className="hero w-full lg:justify-start rounded my-8 md:my-0 ">
                                            <div className="hero-content items-start justify-start flex-col lg:flex-row ">
                                                <figure className="w-32 h-32 overflow-hidden rounded-full flex justify-center items-start">
                                                    <img src={User.image || ImgSrc} className="" />
                                                </figure>
                                                <div className=" mx-0 flex flex-col justify-start items-start">
                                                    <h3 className="text-2xl lg:text-3xl font-bold">{User.Name}</h3>
                                                    <div className='text-sm py-2 '>{User.Role}
                                                        <br />
                                                        {User.Email} <br />
                                                        <br />
                                                        <ul className="flex justify-start mt-1 space-x-4">
                                                            <li>
                                                                {/* Facebook  */}
                                                                <a href={User.Facebook} target='blank' className="">
                                                                    <svg className="w-8 h-8 hover:text-blue-700 " fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                                        <path fill-rule="evenodd"
                                                                            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                                                            clip-rule="evenodd"></path>
                                                                    </svg>
                                                                </a>
                                                            </li>

                                                            <li>
                                                                {/* Github  */}
                                                                <a href={User.Github} target='blank' className="">
                                                                    <svg className="w-8 h-8 hover:text-black" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                                        <path fill-rule="evenodd"
                                                                            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                                                            clip-rule="evenodd"></path>
                                                                    </svg>
                                                                </a>
                                                            </li>

                                                            <li>
                                                                {/* Talegram  */}
                                                                <a href={User.Talegram} target='blank' className="">
                                                                    <svg className="w-8 h-8 hover:text-blue-500" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                                        <path fill-rule="evenodd"
                                                                            d="M18.384,22.779c0.322,0.228 0.737,0.285 1.107,0.145c0.37,-0.141 0.642,-0.457 0.724,-0.84c0.869,-4.084 2.977,-14.421 3.768,-18.136c0.06,-0.28 -0.04,-0.571 -0.26,-0.758c-0.22,-0.187 -0.525,-0.241 -0.797,-0.14c-4.193,1.552 -17.106,6.397 -22.384,8.35c-0.335,0.124 -0.553,0.446 -0.542,0.799c0.012,0.354 0.25,0.661 0.593,0.764c2.367,0.708 5.474,1.693 5.474,1.693c0,0 1.452,4.385 2.209,6.615c0.095,0.28 0.314,0.5 0.603,0.576c0.288,0.075 0.596,-0.004 0.811,-0.207c1.216,-1.148 3.096,-2.923 3.096,-2.923c0,0 3.572,2.619 5.598,4.062Zm-11.01,-8.677l1.679,5.538l0.373,-3.507c0,0 6.487,-5.851 10.185,-9.186c0.108,-0.098 0.123,-0.262 0.033,-0.377c-0.089,-0.115 -0.253,-0.142 -0.376,-0.064c-4.286,2.737 -11.894,7.596 -11.894,7.596Z"
                                                                            clip-rule="evenodd"></path>
                                                                    </svg>
                                                                </a>
                                                            </li>

                                                            <li>
                                                                {/* Instagram  */}
                                                                <a href={User.Instagram} target='blank' className="">
                                                                    <svg className="w-8 h-8 hover:text-red-500" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                                        <path fill-rule="evenodd"
                                                                            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                                                                            clip-rule="evenodd"></path>
                                                                    </svg>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <br />
                                                </div>
                                            </div>
                                        </div>
                                        <hr className='w-full' />
                                    </div>
                                ))
                            }
                            <Link to={"/"} className='hidden md:block'>
                                <p className="text-center w- py-4 w-full text-white text-3xl font-bold border bg-orange-500  duration-1000 btn-outline">
                                    Stay With Frienemie, ❤
                                </p>
                            </Link>
                        </div>
                    </div>
                </div>
                <Link to={"/"} className='mt-5 md:hidden md:mt-0'>
                    <button className="text-center w- py-4 w-full text-white text-3xl font-bold bg-orange-500 outline">
                        Stay With Frienemie, ❤
                    </button>
                </Link>
                <hr className="w-1/2 h-1 hidden md:flex bg-orange-500 mx-auto  rounded-full" />
            </section>
        </div>
    );
};

export default TeamMembers;
