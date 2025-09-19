import React from 'react';
import err from '../../assets/Img/err.png'
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <div className='h-auto w-auto flex flex-col justify-center items-center my-8'>

            <img className='lg:w-1/3 w-1/2 my-8 ' src={err} alt="" />
            <Link to={'/'} >
                <button className="btn btn-outline btn-accent mt-8">Go To Home</button>
            </Link>

        </div>
    );
};

export default Error;