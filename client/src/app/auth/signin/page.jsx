"use client";

import { useRouter } from "next/navigation";
import Forms from"@/components/Forms";
import Link from "next/link";

const SignInPage = () => {
  const router = useRouter();

  const signInFields = [
    {
      name: "email",
      type: "email",
      label: "Email address",
      placeholder: "your@email.com",
      required: true,
    },
    {
      name: "password",
      type: "password",
      label: "Password",
      placeholder: "Enter your password",
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
    <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img alt="Your Company" src="" className="mx-auto h-10 w-auto" />
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
          <Link
            href="/auth/forgot-password"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Forgot password?
          </Link>
        </div>
        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{" "}
          <Link
            href="/auth/signup"
            className="font-semibold leading-6 text-yellow-600 hover:text-green-900"
          >
            Sign up now.
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
