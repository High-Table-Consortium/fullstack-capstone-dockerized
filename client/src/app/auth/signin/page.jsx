// "use client";

// import { useRouter } from "next/navigation";
// import Forms from"@/components/Forms";
// import Link from "next/link";

// const SignInPage = () => {
//   const router = useRouter();

//   const signInFields = [
//     {
//       name: "email",
//       type: "email",
//       label: "Email address",
//       placeholder: "your@email.com",
//       required: true,
//     },
//     {
//       name: "password",
//       type: "password",
//       label: "Password",
//       placeholder: "Enter your password",
//       required: true,
//     },
//   ];

//   const validationSchema = {
//     email: {
//       required: "Email is required",
//       pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//       message: "Please enter a valid email address",
//     },
//     password: {
//       required: "Password is required",
//     },
//   };

//   const handleSignIn = (formData) => {
//     console.log("Signing in with:", formData);
//     router.push("/");
//   };

//   return (
//     <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-100">
//       <div className="sm:mx-auto sm:w-full sm:max-w-sm">
//         <img alt="Your Company" src="" className="mx-auto h-10 w-auto" />
//         <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
//           Sign in to your account
//         </h2>
//       </div>

//       <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
//         <Forms
//           fields={signInFields}
//           validationSchema={validationSchema}
//           onSubmit={handleSignIn}
//           buttonText="Sign In"
//           buttonClassName="flex w-full justify-center rounded-md bg-green-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//         />
//         <div className="mt-2 text-center">
//           <Link
//             href="/auth/forgot-password"
//             className="font-semibold text-indigo-600 hover:text-indigo-500"
//           >
//             Forgot password?
//           </Link>
//         </div>
//         <p className="mt-10 text-center text-sm text-gray-500">
//           Not a member?{" "}
//           <Link
//             href="/auth/signup"
//             className="font-semibold leading-6 text-yellow-600 hover:text-green-900"
//           >
//             Sign up now.
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SignInPage;

"use client";

import { useRouter } from "next/navigation";
import Forms from "@/components/Forms";
import Link from "next/link";

const SignInPage = () => {
  const router = useRouter();

  const signInFields = [
    {
      name: "email",
      type: "email",
      label: "Email*",
      placeholder: "mail@safari.com",
      required: true,
    },
    {
      name: "password",
      type: "password",
      label: "Password*",
      placeholder: "Enter a password",
      required: true,
    },
  ];

  const validationSchema = {
    email: {
      required: "Email is required",
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Please enter a valid email address",
    },
    password: {
      required: "Password is required",
    },
  };

  const handleSignIn = (formData) => {
    console.log("Signing in with:", formData);
    router.push("/");
  };

  return (
    // Main container: centers the form in the middle of the screen
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      
      {/* Form wrapper: limits the width of the form and adds padding and shadow */}
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow">

        {/* Header section: Title and description */}
        <h2 className="text-4xl font-extrabold text-center text-gray-900">Sign In</h2>
        <p className="text-center text-gray-600">Enter your email and password</p>

        {/* Google Sign-In button */}
        <a
          className="flex items-center justify-center w-full py-4 text-sm font-medium text-gray-900 bg-gray-200 rounded-2xl hover:bg-gray-300"
          href="#"
        >
          <img
            className="h-5 mr-2"
            src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png"
            alt="Google logo"
          />
          Sign in with Google
        </a>

        {/* Divider between Google sign-in and email/password form */}
        <div className="flex items-center mt-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-4 text-gray-500">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Email and Password Form (using the Forms component) */}
        <Forms
          fields={signInFields}
          validationSchema={validationSchema}
          onSubmit={handleSignIn}
          buttonText="Sign In"
          buttonClassName="w-full py-4 font-bold text-white bg-green-900 rounded-full hover:bg-green-800 focus:ring-4 focus:ring-yellow-300"
          inputClassName="w-full px-4 py-3 mt-2 text-sm text-gray-900 bg-gray-200 rounded-xl focus:outline-none"
        />

        {/* Checkbox and "Forgot password" link */}
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

        {/* Sign up link */}
        <p className="mt-6 text-sm text-center text-gray-500">
          Not registered yet?{" "}
          <Link href="/auth/signup" className="font-bold text-yellow-500 hover:text-green-800">
            Create an Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;



