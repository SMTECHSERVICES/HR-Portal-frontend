import React from 'react'

//import hero from '/homebanner.jpg'
import { Link } from 'react-router-dom'
import { FaUserGraduate, FaChalkboardTeacher } from "react-icons/fa";

const LoginCommonLayout = ({login1,login2,heading,paragraph,to1,to2,hero}) => {
  return (
    <>
   
<section
    
      className="bg-cover bg-center bg-no-repeat relative h-screen flex items-center"
      style={{ backgroundImage: `url(${hero})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[white]/60 bg-opacity-90"></div>

      <div className="relative z-10 w-full text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
          {heading} 
        </h1>
        <p className="text-lg md:text-xl text-black mb-10 max-w-3xl mx-auto">
          {paragraph}
        </p>

        <div className="flex justify-center gap-6 flex-wrap">
            <Link
            to={to1}
            className="flex items-center gap-2 bg-[#FF3366] hover:bg-[#e62d5b] text-white font-semibold px-6 py-3 rounded-lg transition"
          >
            <FaUserGraduate className="text-xl" />
            {login1}
          </Link>
          <Link
            to={to2}
            className="flex items-center gap-2 bg-[#465ADA] hover:bg-[#3651d1] text-white font-semibold px-6 py-3 rounded-lg transition"
          >
            <FaChalkboardTeacher className="text-xl" />
           {login2}
          </Link>
        
        </div>
        
      </div>
     
    </section>
   
    </>
  )
}

export default LoginCommonLayout