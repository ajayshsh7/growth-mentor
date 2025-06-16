import React from "react";
import { Link } from "react-router-dom";
import pic from '../assets/picture.jpg';

const Hero: React.FC = () => {
  return (
    <div className="mt-15 grid grid-flow-row justify-center text-center px-1 lg:mt-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl sm:text2x1 font-sans font-bold mb-4">
          Strategic Consulting for High-Growth Tech Startups.
        </h1>
        <p className="text-base md:text-lg text-gray-700 mb-8">
          We guide startups through every growth phase, From validating your MVP to optimizing revenue models and scaling operations
        </p>
        <div>
          <Link to={'/book'} className="cursor-pointer text-xl px-6 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition">
            Book Consultation
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto bg-black mt-16 mb-4 rounded-3xl overflow-hidden">
        <img
          src={pic}
          alt="Hero"
          className="w-full object-cover object-top opacity-70 lg:aspect-[2/1] md:aspect-[1/.35]"
        />
      </div>
    </div>
  );
};

export default Hero;
