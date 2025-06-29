// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const HrAuth = () => {

//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });
//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value, type,} = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
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

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const validationErrors = validate();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//     } else {
//       // Login logic would go here
//       if(formData.email === import.meta.env.VITE_COMPANY_EMAIL && formData.password === import.meta.env.VITE_HR_PASSWORD){
//           alert('Login successful!');
//           navigate('/hr/dashboard')
//       }else{
//         alert('Invalid credentials')
//       }
      
      
     
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="flex justify-center">
//           <div className="    w-16 h-16">
//             <img src='/smLogo.png' alt='company logo' className='w-full h-full' />
//           </div>
//         </div>
//         <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//           HR Portal Login
//         </h2>
//         <p className="mt-2 text-center text-sm text-gray-600">
//           Enter your credentials to access the HR dashboard
//         </p>
//       </div>

//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="bg-white py-8 px-4 shadow-xl rounded-lg sm:rounded-lg sm:px-10 border border-gray-200">
//           <form className="space-y-6" onSubmit={handleSubmit}>
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                 Company Email
//               </label>
//               <div className="mt-1">
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   autoComplete="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className={`appearance-none block w-full px-3 py-2 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
//                 />
//                 {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
//               </div>
//             </div>

//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                 Password
//               </label>
//               <div className="mt-1">
//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                   autoComplete="current-password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   className={`appearance-none block w-full px-3 py-2 border ${errors.password ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
//                 />
//                 {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
//               </div>
//             </div>

          

//             <div>
//               <button
//                 type="submit"
//                 className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300"
//               >
//                 Sign in
//               </button>
//             </div>
//           </form>

//           <div className="mt-6">
//             <div className="relative">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-gray-300"></div>
//               </div>
//               {/* <div className="relative flex justify-center text-sm">
//                 <span className="px-2 bg-white text-gray-500">
//                   New to HR Portal? 
//                 </span>
//               </div> */}
//             </div>

//             {/* <div className="mt-3">
//               <a
//                 href="#"
//                 className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
//               >
//                 Request access
//               </a>
//             </div> */}
//           </div>
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
import { FaUser, FaEnvelope, FaPhone, FaUniversity, FaLock } from 'react-icons/fa';

const HrAuth = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      if(formData.email === import.meta.env.VITE_COMPANY_EMAIL && formData.password === import.meta.env.VITE_HR_PASSWORD){
        alert('Login successful!');
        navigate('/hr/dashboard')
      } else {
        alert('Invalid credentials')
      }
    }
  };

  // Intern registration handlers
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const validateRegister = () => {
    const newErrors = {};
    if (!registerData.name) newErrors.name = 'Full name is required';
    if (!registerData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(registerData.email)) newErrors.email = 'Email is invalid';
    if (!registerData.phone) newErrors.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(registerData.phone)) newErrors.phone = 'Phone must be 10 digits';
    if (!registerData.university) newErrors.university = 'University is required';
    if (!registerData.password) newErrors.password = 'Password is required';
    else if (registerData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (registerData.password !== registerData.confirmPassword) 
      newErrors.confirmPassword = 'Passwords do not match';
    return newErrors;
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateRegister();
    if (Object.keys(validationErrors).length > 0) {
      setRegisterErrors(validationErrors);
    } else {
      // Registration logic (would typically be an API call)
      console.log('Intern registered:', registerData);
      setRegistrationSuccess(true);
      
      // Reset form after successful registration
      setTimeout(() => {
        setRegisterData({
          name: '',
          email: '',
          phone: '',
          university: '',
          password: '',
          confirmPassword: ''
        });
        setRegistrationSuccess(false);
      }, 2000);
    }
  };

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
        <div className="bg-white py-8 px-4 shadow-xl rounded-lg sm:rounded-lg sm:px-10 border border-gray-200">
          {!showRegisterForm ? (
            // HR Login Form
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
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`appearance-none block w-full px-3 py-2 border ${errors.password ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  />
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
              
              <div className="mt-4">
                <button
                  onClick={() => setShowRegisterForm(true)}
                  className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition duration-300"
                >
                  Register New Intern
                </button>
              </div>
            </form>
          ) : (
            // Intern Registration Form
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              {registrationSuccess && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                  <p>Intern registered successfully!</p>
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={registerData.name}
                    onChange={handleRegisterChange}
                    className={`w-full pl-10 pr-3 py-2 border ${registerErrors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    placeholder="John Doe"
                  />
                </div>
                {registerErrors.name && <p className="mt-1 text-sm text-red-600">{registerErrors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={registerData.email}
                    onChange={handleRegisterChange}
                    className={`w-full pl-10 pr-3 py-2 border ${registerErrors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    placeholder="intern.email@example.com"
                  />
                </div>
                {registerErrors.email && <p className="mt-1 text-sm text-red-600">{registerErrors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaPhone className="text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={registerData.phone}
                    onChange={handleRegisterChange}
                    className={`w-full pl-10 pr-3 py-2 border ${registerErrors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    placeholder="1234567890"
                  />
                </div>
                {registerErrors.phone && <p className="mt-1 text-sm text-red-600">{registerErrors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">University</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUniversity className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="university"
                    value={registerData.university}
                    onChange={handleRegisterChange}
                    className={`w-full pl-10 pr-3 py-2 border ${registerErrors.university ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    placeholder="University Name"
                  />
                </div>
                {registerErrors.university && <p className="mt-1 text-sm text-red-600">{registerErrors.university}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-gray-400" />
                  </div>
                  <input
                    type="password"
                    name="password"
                    value={registerData.password}
                    onChange={handleRegisterChange}
                    className={`w-full pl-10 pr-3 py-2 border ${registerErrors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    placeholder="••••••••"
                  />
                </div>
                {registerErrors.password && <p className="mt-1 text-sm text-red-600">{registerErrors.password}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-gray-400" />
                  </div>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={registerData.confirmPassword}
                    onChange={handleRegisterChange}
                    className={`w-full pl-10 pr-3 py-2 border ${registerErrors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    placeholder="••••••••"
                  />
                </div>
                {registerErrors.confirmPassword && <p className="mt-1 text-sm text-red-600">{registerErrors.confirmPassword}</p>}
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setShowRegisterForm(false)}
                  className="w-1/3 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="w-2/3 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Register Intern
                </button>
              </div>
            </form>
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