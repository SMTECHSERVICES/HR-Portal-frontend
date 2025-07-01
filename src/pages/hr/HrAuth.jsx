
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaUser, FaEnvelope, FaPhone, FaUniversity, FaLock } from 'react-icons/fa';
// import axios from 'axios'
// import {server} from "../../constants/api"

// const HrAuth = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });
//   const [errors, setErrors] = useState({});
//   const [showRegisterForm, setShowRegisterForm] = useState(false);
//   const [registerData, setRegisterData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     university: '',
//     password: '',
//     confirmPassword: ''
//   });
//   const [registerErrors, setRegisterErrors] = useState({});
//   const [registrationSuccess, setRegistrationSuccess] = useState(false);
//   const [isRegistering, setIsRegistering] = useState(false);
//   const [apiError, setApiError] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const validate = () => {
//     const newErrors = {};
//     if (!formData.email) {
//       newErrors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Email address is invalid';
//     }
//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     } else if (formData.password.length < 6) {
//       newErrors.password = 'Password must be at least 6 characters';
//     }
//     return newErrors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validate();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//     } else {
//       if(formData.email === import.meta.env.VITE_COMPANY_EMAIL && formData.password === import.meta.env.VITE_HR_PASSWORD){
//         try {
//           const response = await axios.post(`${server}/hr/login`,{
//             ...formData
//           },{
//             withCredentials:true
//           })
//           alert('Login successful!');
//         navigate('/hr/dashboard')
//         } catch (error) {
          
//         }
        
//       } else {
//         alert('Invalid credentials')
//       }
//     }
//   };

//   // Intern registration handlers
//   const handleRegisterChange = (e) => {
//     const { name, value } = e.target;
//     setRegisterData({ ...registerData, [name]: value });
//   };

//   const validateRegister = () => {
//     const newErrors = {};
//     if (!registerData.name) newErrors.name = 'Full name is required';
//     if (!registerData.email) newErrors.email = 'Email is required';
//     else if (!/\S+@\S+\.\S+/.test(registerData.email)) newErrors.email = 'Email is invalid';
//     if (!registerData.phone) newErrors.phone = 'Phone number is required';
//     else if (!/^\d{10}$/.test(registerData.phone)) newErrors.phone = 'Phone must be 10 digits';
//     if (!registerData.university) newErrors.university = 'University is required';
//     if (!registerData.password) newErrors.password = 'Password is required';
//     else if (registerData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
//     if (registerData.password !== registerData.confirmPassword) 
//       newErrors.confirmPassword = 'Passwords do not match';
//     return newErrors;
//   };

//   const handleRegisterSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validateRegister();
    
//     if (Object.keys(validationErrors).length > 0) {
//       setRegisterErrors(validationErrors);
//       return;
//     }
    
//     setIsRegistering(true);
//     setApiError('');
    
//     try {
//       // Prepare data for API
//       const internData = {
//         name: registerData.name,
//         email: registerData.email,
//         phone: registerData.phone,
//         university: registerData.university,
//         password: registerData.password
//       };
      
//       // Send POST request using axios
//       const response = await axios.post(`${server}/intern/register`, internData, {
//         headers: {
//           'Content-Type': 'application/json',
//         }
//       });
//       console.log(response)
      
//       // Registration successful
//       setRegistrationSuccess(true);
      
//       // Reset form after successful registration
//       setRegisterData({
//         name: '',
//         email: '',
//         phone: '',
//         university: '',
//         password: '',
//         confirmPassword: ''
//       });

//       alert(response?.data?.message)
      
//       // Clear success message after 3 seconds
//       setTimeout(() => {
//         setRegistrationSuccess(false);
//       }, 3000);
      
//     } catch (error) {
//       console.error('Registration error:', error);
//       alert(error?.response?.data?.message)
//       setApiError(error.response?.data?.message || error.message || 'An error occurred during registration');
//     } finally {
//       setIsRegistering(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="flex justify-center">
//           <div className="w-16 h-16">
//             <img src='/smLogo.png' alt='company logo' className='w-full h-full' />
//           </div>
//         </div>
//         <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//           {showRegisterForm ? 'Register New Intern' : 'HR Portal Login'}
//         </h2>
//         <p className="mt-2 text-center text-sm text-gray-600">
//           {showRegisterForm 
//             ? 'Fill in the details to register a new intern' 
//             : 'Enter your credentials to access the HR dashboard'}
//         </p>
//       </div>

//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="bg-white py-8 px-4 shadow-xl rounded-lg sm:rounded-lg sm:px-10 border border-gray-200">
//           {!showRegisterForm ? (
//             // HR Login Form
//             <form className="space-y-6" onSubmit={handleSubmit}>
//               <div>
//                 <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                   Company Email
//                 </label>
//                 <div className="mt-1">
//                   <input
//                     id="email"
//                     name="email"
//                     type="email"
//                     autoComplete="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     className={`appearance-none block w-full px-3 py-2 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
//                   />
//                   {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
//                 </div>
//               </div>

//               <div>
//                 <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                   Password
//                 </label>
//                 <div className="mt-1">
//                   <input
//                     id="password"
//                     name="password"
//                     type="password"
//                     autoComplete="current-password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     className={`appearance-none block w-full px-3 py-2 border ${errors.password ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
//                   />
//                   {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
//                 </div>
//               </div>

//               <div>
//                 <button
//                   type="submit"
//                   className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300"
//                 >
//                   Sign in
//                 </button>
//               </div>
             
//             </form>
//           ) : (
//             // Intern Registration Form
//             null
//           )}
//         </div>

//         <div className="mt-6 text-center text-sm text-gray-500">
//           <p>© {new Date().getFullYear()} HR Management System. All rights reserved.</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HrAuth;




import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaUniversity, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import { server } from "../../constants/api";

const HrAuth = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false); // 👈 Add state
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    phone: '',
    university: '',
    password: '',
    confirmPassword: ''
  });
  const [registerErrors, setRegisterErrors] = useState({});
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [apiError, setApiError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      if (formData.email === import.meta.env.VITE_COMPANY_EMAIL && formData.password === import.meta.env.VITE_HR_PASSWORD) {
        try {
          const response = await axios.post(`${server}/hr/login`, {
            ...formData
          }, {
            withCredentials: true
          });
          alert('Login successful!');
          navigate('/hr/dashboard');
        } catch (error) {
          alert('Login failed');
        }
      } else {
        alert('Invalid credentials');
      }
    }
  };

  // Intern registration handlers
  



 

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-16 h-16">
            <img src='/smLogo.png' alt='company logo' className='w-full h-full' />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {showRegisterForm ? 'Register New Intern' : 'HR Portal Login'}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {showRegisterForm
            ? 'Fill in the details to register a new intern'
            : 'Enter your credentials to access the HR dashboard'}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl rounded-lg sm:px-10 border border-gray-200">
          {!showRegisterForm ? (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Company Email
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`appearance-none block w-full px-3 py-2 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  />
                  {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`appearance-none block w-full px-3 py-2 border ${errors.password ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  />
                  <div
                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </div>
                  {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300"
                >
                  Sign in
                </button>
              </div>
            </form>
          ) : (
            
            null
          )}
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} HR Management System. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default HrAuth;
