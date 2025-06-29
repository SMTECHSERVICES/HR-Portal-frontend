import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaUniversity, FaLock } from 'react-icons/fa';
import axios from 'axios';
import { server } from '../../constants/api';
import { useNavigate } from 'react-router-dom';
import HrLayout from '../../layout/HrLayout';

const InternRegistraion = () => {
    const navigate = useNavigate();
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

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateRegister();
    if (Object.keys(validationErrors).length > 0) {
      setRegisterErrors(validationErrors);
      return;
    }

    setIsRegistering(true);
    setApiError('');
    try {
      const internData = {
        name: registerData.name,
        email: registerData.email,
        phone: registerData.phone,
        university: registerData.university,
        password: registerData.password
      };

     const response = await axios.post(`${server}/hr/intern/register`, internData, {
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});


      setRegistrationSuccess(true);
      setRegisterData({
        name: '',
        email: '',
        phone: '',
        university: '',
        password: '',
        confirmPassword: ''
      });

      alert(response?.data?.message);

      setTimeout(() => setRegistrationSuccess(false), 3000);
      navigate('/hr/dashboard')
    } catch (error) {
      console.error('Registration error:', error);
      alert(error?.response?.data?.message);
      setApiError(error.response?.data?.message || error.message || 'An error occurred during registration');
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <>
    <HrLayout>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-16 h-16">
            <img src="/smLogo.png" alt="company logo" className="w-full h-full" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Register New Intern</h2>
        <p className="mt-2 text-center text-sm text-gray-600">Fill in the details to register a new intern</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl rounded-lg sm:px-10 border border-gray-200">
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            {registrationSuccess && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                <p>Intern registered successfully!</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <div className="relative">
                <FaUser className="absolute left-3 top-2.5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={registerData.name}
                  onChange={handleRegisterChange}
                  className={`w-full pl-10 pr-3 py-2 border ${registerErrors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="John Doe"
                />
              </div>
              {registerErrors.name && <p className="mt-1 text-sm text-red-600">{registerErrors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-2.5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={registerData.email}
                  onChange={handleRegisterChange}
                  className={`w-full pl-10 pr-3 py-2 border ${registerErrors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="intern.email@example.com"
                />
              </div>
              {registerErrors.email && <p className="mt-1 text-sm text-red-600">{registerErrors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <div className="relative">
                <FaPhone className="absolute left-3 top-2.5 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  value={registerData.phone}
                  onChange={handleRegisterChange}
                  className={`w-full pl-10 pr-3 py-2 border ${registerErrors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="1234567890"
                />
              </div>
              {registerErrors.phone && <p className="mt-1 text-sm text-red-600">{registerErrors.phone}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">University</label>
              <div className="relative">
                <FaUniversity className="absolute left-3 top-2.5 text-gray-400" />
                <input
                  type="text"
                  name="university"
                  value={registerData.university}
                  onChange={handleRegisterChange}
                  className={`w-full pl-10 pr-3 py-2 border ${registerErrors.university ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="University Name"
                />
              </div>
              {registerErrors.university && <p className="mt-1 text-sm text-red-600">{registerErrors.university}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <FaLock className="absolute left-3 top-2.5 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  className={`w-full pl-10 pr-3 py-2 border ${registerErrors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="••••••••"
                />
              </div>
              {registerErrors.password && <p className="mt-1 text-sm text-red-600">{registerErrors.password}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <div className="relative">
                <FaLock className="absolute left-3 top-2.5 text-gray-400" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={registerData.confirmPassword}
                  onChange={handleRegisterChange}
                  className={`w-full pl-10 pr-3 py-2 border ${registerErrors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="••••••••"
                />
              </div>
              {registerErrors.confirmPassword && <p className="mt-1 text-sm text-red-600">{registerErrors.confirmPassword}</p>}
            </div>

            <div>
              <button
                type="submit"
                disabled={isRegistering}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {isRegistering ? 'Registering...' : 'Register Intern'}
              </button>
            </div>
          </form>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} HR Management System. All rights reserved.</p>
        </div>
      </div>
    </div>
    </HrLayout>
    </>
  );
};

export default InternRegistraion;
