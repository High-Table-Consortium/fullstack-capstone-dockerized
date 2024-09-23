"use client"; 

import { useRouter } from 'next/navigation';
import Forms from '@/app/Components/Forms';

const SignInPage = () => {
  const router = useRouter();

  const signInFields = [
    { name: 'email', type: 'email', label: 'Email', placeholder: 'your@email.com', required: true },
    { name: 'password', type: 'password', label: 'Password', placeholder: 'Enter your password', required: true },
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

  const handleSignIn = (formData) => {
    console.log('Signing in with:', formData);
    router.push('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
        <h1 className="text-4xl font-normal text-black text-center mb-6">Welcome back!</h1>

        <Forms
          fields={signInFields}
          validationSchema={validationSchema}
          onSubmit={handleSignIn}
          buttonText="Sign In"
          buttonClassName="rounded-full w-2/3 mx-auto font-bold"
        />

        <div className="mt-4 text-center">
          <a href="/forgot-password" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
        </div>

        <div className="mt-2 text-center text-sm text-black">
          Not a member? <a href="/sign-up" className="text-blue-600 hover:underline">Sign up now</a>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;





