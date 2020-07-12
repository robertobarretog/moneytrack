import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="landing-showcase">
      <div className="relative h-20 z-20">
        <h1 className="absolute font-bold text-4xl w-40 md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 top-30 left-5 transform translate-x-0 translate-y-0">
          MoneyTrack
        </h1>
        <Link
          className="transition duration-500 ease-in-out absolute bg-orange-500 text-white hover:bg-orange-600 py-2 px-4 rounded-lg top-1/2 right-0 transform -translate-x-1/2 -translate-y-1/2"
          to="/login"
        >
          Log In
        </Link>
      </div>
      <div className="relative z-20 m-auto flex flex-col justify-center items-center text-center mt-32">
        <h2 className="font-semibold text-5xl mb-4 text-blue-500">
          Manage your finances
        </h2>
        <p className="text-blue-500 text-2xl mb-4">
          Start getting your finances under control by tracking your income and
          expenses
        </p>
        <Link
          className="transition duration-500 ease-in-out bg-orange-500 text-white text-xl hover:bg-orange-600 py-3 px-6 rounded-lg"
          to="/register"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Landing;
