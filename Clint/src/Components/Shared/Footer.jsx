import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/Img/Logo.jpg';

const Footer = () => {
    return (
        <>
            <hr />
            <footer className="footer (p-10 bg-neutral) lg:px-12 p-10 ">
                <aside>
                    <div className="flex items-center justify-center ">
                        <Link to={"/"} className='flex items-center pb-4'>
                            <figure className='md:w-16 w-12 md:h-16 h-12'>
                                <img src={logo} alt="" className='rounded shadow-2xl shadow-slate-700' />
                            </figure>
                            <h1 className='md:text-4xl text-2xl font-bold ms-3'>Frienemie</h1>
                        </Link>
                    </div>
                    <p>Copyright-2023 © Sakib Talukqder</p>
                    <p>All Rights Resurved</p>
                </aside>
                <nav>
                    <header className="text-lg font-bold">Stay Connected With Us</header>
                    <div className="grid grid-flow-col gap-4">
                        <a href="#">
                            <svg className="w-7 h-7 hover:text-cyan-600 " fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path
                                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                ></path>
                            </svg>
                        </a>
                        <a href="#">
                            <svg className="w-7 h-7 hover:text-blue-600 " fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path
                                    d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
                                ></path>
                            </svg>
                        </a>
                        <a href='#'>
                            <svg className="w-7 h-7 hover:text-red-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path
                                    d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"
                                ></path>
                            </svg>
                        </a>
                        <a href="#">
                            <svg className="w-8 h-8 hover:text-cyan-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path
                                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                ></path>
                            </svg>
                        </a>
                    </div>
                    <br />
                    <Link className='btn-outline btn-accent btn btn-sm rounded-none' to={"/about/members"}>Help & Supports</Link>
                </nav>
            </footer>
        </>
    );
};

export default Footer;