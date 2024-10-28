'use client';

import { useRouter } from 'next/navigation';
import Forms from '../../../components/Forms';
import Link from 'next/link';
import { googleLogin } from '../../API/api';
import { useAuth } from '../../../context/authContent';
import { useState } from 'react';

const SignInPage = () => {
  const router = useRouter();
  const { login, message, setError, error } = useAuth();
  const [errorMessage, setErrorMessage] = useState(message || '');
  const [showPassword, setShowPassword] = useState(false);
  // const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const signInFields = [
    {
      name: 'email',
      type: 'email',
      label: 'Email*',
      placeholder: 'mail@safari.com',
      required: true,
    },
    {
      name: 'password',
      type: 'password',
      label: 'Password*',
      placeholder: 'Enter a password',
      required: true,
    },
  ];

  const validationSchema = {
    email: {
      required: 'Email is required',
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Please enter a valid email address',
    },
    password: {
      required: 'Password is required',
    },
  };

  const handleSignIn = async (formData) => {
    try {
      await login(formData.email, formData.password);
      setError(''); // Clear messages
      // router.push('/');
      
    } catch (error) {
      console.error('Sign-in error:', error);
      setError('An error occurred during sign-in. Please try again later.');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const response = await googleLogin();

      if (response?.data?.success) {
        router.push('/');
      } else {
        setError('Google sign-in failed. Please try again.');
      }
    } catch (error) {
      console.error('Error with Google sign-in:', error);
      setError('An error occurred during Google sign-in. Please try again later.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow">
        <h2 className="text-4xl font-extrabold text-center text-gray-900">Sign In</h2>
        <p className="text-center text-gray-600">Enter your email and password</p>

        {error && <p className="text-sm text-red-500 text-center mt-2">{error}</p>}

        <button
          className="flex items-center justify-center w-full py-4 text-sm font-medium text-gray-900 bg-gray-200 rounded-2xl hover:bg-gray-300"
          onClick={handleGoogleSignIn}
        >
          <img
            className="h-5 mr-2"
            src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png"
            alt="Google logo"
          />
          Sign in with Google
        </button>

        <div className="flex items-center mt-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-4 text-gray-500">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <Forms
          fields={signInFields}
          validationSchema={validationSchema}
          onSubmit={handleSignIn}
          
          buttonText="Sign In"
          buttonClassName="w-full py-4 font-bold text-white bg-green-900 rounded-full hover:bg-green-800 focus:ring-4 focus:ring-yellow-300"
          inputClassName="w-full px-4 py-3 mt-2 text-sm text-gray-900 bg-gray-200 rounded-xl focus:outline-none"
        />

        <div className="flex items-center justify-between mt-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-green-500"
            />
            <span className="ml-2 text-sm text-green-900">Keep me logged in</span>
          </label>
          <Link
            href="/auth/forgot-password"
            className="text-sm font-medium text-yellow-500 hover:text-green-800"
          >
            Forgot password?
          </Link>
        </div>

        <p className="mt-6 text-sm text-center text-gray-500">
          Not registered yet?{' '}
          <Link href="/auth/signup" className="font-bold text-yellow-500 hover:text-green-800">
            Create an Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
