// "use client"; 

// import { useRouter } from 'next/navigation';
// import Forms from '@/app/Components/Forms';

// const SignInPage = () => {
//   const router = useRouter();

//   const signInFields = [
//     { name: 'email', type: 'email', label: 'Email', placeholder: 'your@email.com', required: true },
//     { name: 'password', type: 'password', label: 'Password', placeholder: 'Enter your password', required: true },
//   ];

//   const validationSchema = {
//     email: {
//       required: 'Email is required',
//       pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//       message: 'Please enter a valid email address',
//     },
//     password: {
//       required: 'Password is required',
//     },
//   };

//   const handleSignIn = (formData) => {
//     console.log('Signing in with:', formData);
//     router.push('/');
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
//         <h1 className="text-4xl font-normal text-black text-center mb-6">Welcome back!</h1>

//         <Forms
//           fields={signInFields}
//           validationSchema={validationSchema}
//           onSubmit={handleSignIn}
//           buttonText="Sign In"
//           buttonClassName="rounded-full w-2/3 mx-auto font-bold"
//         />

//         <div className="mt-4 text-center">
//           <a href="/forgot-password" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
//         </div>

//         <div className="mt-2 text-center text-sm text-black">
//           Not a member? <a href="/sign-up" className="text-blue-600 hover:underline">Sign up now</a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignInPage;


"use client"; 

import { useRouter } from 'next/navigation';
import Forms from '@/app/Components/Forms';

const SignInPage = () => {
  const router = useRouter();

  const signInFields = [
    { name: 'email', type: 'email', label: 'Email address', placeholder: 'your@email.com', required: true },
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
    <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src=""
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Forms
          fields={signInFields}
          validationSchema={validationSchema}
          onSubmit={handleSignIn}
          buttonText="Sign In"
          buttonClassName="flex w-full justify-center rounded-md bg-green-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        />
        <div className="mt-2 text-center">
          <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
            Forgot password?
          </a>
        </div>
        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{' '}
          <a href="#" className="font-semibold leading-6 text-yellow-600 hover:text-green-900">
            Sign up now.
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;



