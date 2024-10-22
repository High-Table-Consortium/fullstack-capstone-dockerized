'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../context/authContent';
import PasswordStrengthMeter from '../../../components/PasswordStrengthMeter';
import { googleLogin } from '../../api/api';

const SignUp = () => {
  const router = useRouter();
  const { register, message, setError, error } = useAuth();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(message || '');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    if (!firstName || !lastName || !email || !password) {
      setError('All fields are required');
      return;
    }

    const success = await register(firstName, lastName, email, password);
    if (success) {
      router.push('/dashboard');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const response = await googleLogin();
      if (response?.data?.success) {
        router.push('/');
      } else {
        setErrorMessage('Google sign-in failed. Please try again.');
      }
    } catch (error) {
      console.error('Error with Google sign-in:', error);
      setErrorMessage('An error occurred during Google sign-in. Please try again later.');
    }
  };

  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="bg-white py-8 px-6 shadow sm:rounded-lg sm:px-10">
          <h2 className="text-center text-4xl font-extrabold leading-9 tracking-tight text-gray-900 mb-8">
            Create your account
          </h2>
          <button
            className="flex items-center justify-center w-full py-4 text-sm font-medium text-gray-900 bg-gray-200 rounded-2xl hover:bg-gray-300"
            onClick={handleGoogleSignIn}
          >
            <img
              className="h-5 mr-2"
              src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png"
              alt="Google logo"
            />
            Sign up with Google
          </button>
          <div className="flex items-center mt-4">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-4 text-gray-500">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {error && (
            <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex space-x-4">
              <div className="flex-1">
                <label htmlFor="firstName" className="font-bold text-black">
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="Enter your first name"
                  className="w-full px-4 py-2 bg-gray-200 rounded-xl"
                  required
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                />
              </div>
              <div className="flex-1">
                <label htmlFor="lastName" className="font-bold text-black">
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Enter your last name"
                  className="w-full px-4 py-2 bg-gray-200 rounded-xl"
                  required
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                />
              </div>
            </div>

            <label htmlFor="email" className="font-bold text-black">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 bg-gray-200 rounded-xl"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />

            {/* Password Field */}
            <div className="relative space-y-2">
              <label htmlFor="password" className="font-bold text-black">Password</label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full px-4 py-2 bg-gray-200 rounded-xl"
                required
                onChange={(event) => setPassword(event.target.value)}
                value={password}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-8 text-gray-600"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {/* Confirm Password Field */}
            <div className="relative space-y-2">
              <label htmlFor="confirmPassword" className="font-bold text-black">Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                className="w-full px-4 py-2 bg-gray-200 rounded-xl"
                required
                onChange={(event) => setConfirmPassword(event.target.value)}
                value={confirmPassword}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-8 text-gray-600"
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
            <PasswordStrengthMeter password={password} />

            <button type="submit" className="w-full px-6 py-3 mt-6 text-sm font-semibold leading-none text-white bg-green-900 rounded-lg hover:bg-green-800">
              Sign Up
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <a href="/auth/signin" className="font-medium text-yellow-500 hover:text-green-800">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
