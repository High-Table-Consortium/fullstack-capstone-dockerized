'use client'

import { React, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "../../../hooks/use-toast";
import { register } from "../../API/api"

const SignUp = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    // firstName: "",
    // lastName: "",
    // username: "",
    email: "",
    password: "",
    // confirmPassword: "",
  });
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  // Form fields
  const fields = [
    { name: "firstName", label: "First Name", type: "text", placeholder: "Enter your first name", required: true },
    { name: "lastName", label: "Last Name", type: "text", placeholder: "Enter your last name", required: true },
    { name: "username", label: "Username", type: "text", placeholder: "Choose a username", required: true },
    { name: "email", label: "Email address", type: "email", placeholder: "Enter your email", required: true },
    { name: "password", label: "Password", type: "password", placeholder: "Enter your password", required: true },
    { name: "confirmPassword", label: "Confirm Password", type: "password", placeholder: "Confirm your password", required: true },
  ];

  // Validation schema
  const validationSchema = {
    firstName: {
      required: "First name is required",
      pattern: /^[A-Z][a-z]{2,}$/,
      message: "First name must start with a capital letter and be at least 3 characters long",
    },
    lastName: {
      required: "Last name is required",
      pattern: /^[A-Z][a-z]{2,}$/,
      message: "Last name must start with a capital letter and be at least 3 characters long",
    },
    username: {
      required: "Username is required",
      pattern: /^\S+$/,
      message: "Username must not contain spaces",
    },
    email: {
      required: "Email is required",
      pattern: /^\S+@\S+\.\S+$/,
      message: "Please enter a valid email address",
    },
    password: {
      required: "Password is required",
      pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/,
      message: "Password must be at least 8 characters long, contain a number, a capital letter, a special character, and a lowercase letter",
    },
    confirmPassword: {
      required: "Confirm Password is required",
      custom: (values) => values.password === values.confirmPassword || "Passwords do not match",
    },
  };


  // const validateForm = (data) => {
  //   const newErrors = {};
  //   Object.keys(validationSchema).forEach((field) => {
  //     if (!data[field]) {
  //       newErrors[field] = validationSchema[field].required;
  //     } else if (validationSchema[field].pattern &&!validationSchema[field].pattern.test(data[field])) {
  //       newErrors[field] = validationSchema[field].message;
  //     } else if (validationSchema[field].custom && typeof validationSchema[field].custom === "function") {
  //       const error = validationSchema[field].custom(data);
  //       if (error) {
  //         newErrors[field] = error;
  //       }
  //     }
  //   });
  //   return newErrors;
  // };



  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      register(email, password)
      router.push('/')
      console.log('user registered successful')
    } catch (error) {
      console.log('something went wrong', error)
    }
  }

  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-lg"> {/* Adjusted max width */}
        <div className="bg-white py-8 px-6 shadow sm:rounded-lg sm:px-10"> {/* Added px-6 for better horizontal padding */}
          <h2 className="text-center text-4xl font-extrabold leading-9 tracking-tight text-gray-900 mb-8"> {/* Moved inside the container */}
            Create your account
          </h2>

          {/* Sign Up with Google Button */}
          <a
            className="flex items-center justify-center w-full py-4 text-sm font-medium text-gray-900 bg-gray-200 rounded-2xl hover:bg-gray-300"
            href="#"
          >
            <img
              className="h-5 mr-2"
              src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png"
              alt="Google logo"
            />
            Sign up with Google
          </a>

          <div className="flex items-center mt-4">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-4 text-gray-500">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex space-x-4">
              <div className="flex-1">
                <label htmlFor="firstName" className="font-bold text-black">First Name</label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="Enter your first name"
                  className="w-full px-4 py-2 border-0 bg-gray-200 focus:ring-0 rounded-xl"
                  required

                />
              </div>
              <div className="flex-1">
                <label htmlFor="lastName" className="font-bold text-black">Last Name</label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Enter your last name"
                  className="w-full px-4 py-2 bg-gray-200 rounded-xl"
                  required
                />
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="flex-1">
                <label htmlFor="username" className="font-bold text-black">Username</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Choose a username"
                  className="w-full px-4 py-2 border-0 bg-gray-200 focus:ring-0 rounded-xl"
                  required
                />
              </div>
              <div className="flex-1">
                <label htmlFor="email" className="font-bold text-black">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border-0 bg-gray-200 focus:ring-0 rounded-xl"
                  required
                  onChange={
                    event => {
                      setEmail(event.target.value);
                    }
                  }
                  value={email}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="font-bold text-black">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border-0 bg-gray-200 focus:ring-0 rounded-xl"
                required
                onChange={
                  event => {
                    setPassword(event.target.value);
                  }
                }
                value={password}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="font-bold text-black">Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                className="w-full px-4 py-2 border-0 bg-gray-200 focus:ring-0 rounded-xl"
                required
              // onChange={onChange}
              />
            </div>

            <button type="submit" className="w-full px-6 py-3 mt-6 text-sm font-semibold leading-none text-white transition duration-300 rounded-lg bg-green-900 hover:bg-green-800 focus:ring-4 focus:ring-yellow-500">
              Sign Up
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
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

// 'use client'
// import React from "react";
// import { useRouter } from "next/navigation";
// import { toast } from "@/hooks/use-toast";
// import Forms from "@/components/forms"; // Import the Forms component

// const SignUp = () => {
//   const router = useRouter();

//   // Form fields
//   const fields = [
//     { name: "firstName", label: "First Name", type: "text", placeholder: "Enter your first name", required: true },
//     { name: "lastName", label: "Last Name", type: "text", placeholder: "Enter your last name", required: true },
//     { name: "username", label: "Username", type: "text", placeholder: "Choose a username", required: true },
//     { name: "email", label: "Email address", type: "email", placeholder: "Enter your email", required: true },
//     { name: "password", label: "Password", type: "password", placeholder: "Enter your password", required: true },
//     { name: "confirmPassword", label: "Confirm Password", type: "password", placeholder: "Confirm your password", required: true },
//   ];

//   // Validation schema
//   const validationSchema = {
//     firstName: {
//       required: "First name is required",
//       pattern: /^[A-Z][a-z]{2,}$/,
//       message: "First name must start with a capital letter and be at least 3 characters long",
//     },
//     lastName: {
//       required: "Last name is required",
//       pattern: /^[A-Z][a-z]{2,}$/,
//       message: "Last name must start with a capital letter and be at least 3 characters long",
//     },
//     username: {
//       required: "Username is required",
//       pattern: /^\S+$/,
//       message: "Username must not contain spaces",
//     },
//     email: {
//       required: "Email is required",
//       pattern: /^\S+@\S+\.\S+$/,
//       message: "Please enter a valid email address",
//     },
//     password: {
//       required: "Password is required",
//       pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/,
//       message: "Password must be at least 8 characters long, contain a number, a capital letter, a special character, and a lowercase letter",
//     },
//     confirmPassword: {
//       required: "Confirm Password is required",
//       custom: (values) => values.password === values.confirmPassword || "Passwords do not match",
//     },
//   };

//   // Handle form submission
//   const handleSubmit = (formData) => {
//     toast({
//       title: "Account created.",
//       description: "We've created your account for you.",
//     });
//     router.push("/signin");
//   };

//   return (
//     <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-100">
//       <div className="sm:mx-auto sm:w-full sm:max-w-lg">
//         <div className="bg-white py-8 px-6 shadow sm:rounded-lg sm:px-10">
//           <h2 className="text-center text-4xl font-extrabold leading-9 tracking-tight text-gray-900 mb-8">
//             Create your account
//           </h2>

//           {/* Sign Up with Google Button */}
//           <a
//             className="flex items-center justify-center w-full py-4 text-sm font-medium text-gray-900 bg-gray-200 rounded-2xl hover:bg-gray-300"
//             href="#"
//           >
//             <img
//               className="h-5 mr-2"
//               src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png"
//               alt="Google logo"
//             />
//             Sign up with Google
//           </a>

//           <div className="flex items-center mt-4">
//             <hr className="flex-grow border-gray-300" />
//             <span className="mx-4 text-gray-500">or</span>
//             <hr className="flex-grow border-gray-300" />
//           </div>

//           {/* Use the Forms component to generate the sign-up form */}
//           <Forms
//             fields={fields}
//             onSubmit={handleSubmit}
//             validationSchema={validationSchema}
//             buttonText="Sign Up"
//             buttonClassName="w-full px-6 py-3 mt-6 text-sm font-semibold leading-none text-white transition duration-300 rounded-lg bg-green-900 hover:bg-green-800 focus:ring-4 focus:ring-green-100"
//             inputClassName="border-0 bg-gray-200 focus:ring-0 rounded-xl"
//           />

//           <p className="mt-6 text-center text-sm text-gray-500">
//             Already have an account?{" "}
//             <a href="/signin" className="font-medium text-yellow-500 hover:text-green-800">
//               Sign In
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUp;



