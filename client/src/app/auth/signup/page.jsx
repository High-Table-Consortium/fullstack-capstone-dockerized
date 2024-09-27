'use client'
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

export default function SignUp() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};

    if (!/^[A-Z][a-z]{2,}$/.test(formData.firstName)) {
      newErrors["firstName"] =
        "First name must start with a capital letter and be at least 3 characters long";
    }

    if (!/^[A-Z][a-z]{2,}$/.test(formData.lastName)) {
      newErrors["lastName"] =
        "Last name must start with a capital letter and be at least 3 characters long";
    }

    if (!/^\S+$/.test(formData.username)) {
      newErrors["username"] = "Username must not contain spaces";
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors["email"] = "Please enter a valid email address";
    }

    if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/.test(
        formData.password
      )
    ) {
      newErrors["password"] =
        "Password must be at least 8 characters long, contain a number, a capital letter, a special character, and a lowercase letter";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors["confirmPassword"] = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      toast({
        title: "Account created.",
        description: "We've created your account for you.",
      });
      router.push("/signin");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-green-600">
            Join us for an adventure
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <Label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </Label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm mt-1"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleChange}
              />
              {errors["firstName"] && (
                <p className="text-red-500 text-xs mt-1">
                  {errors["firstName"]}
                </p>
              )}
            </div>
            <div>
              <Label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </Label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm mt-1"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={handleChange}
              />
              {errors["lastName"] && (
                <p className="text-red-500 text-xs mt-1">
                  {errors["lastName"]}
                </p>
              )}
            </div>
            <div>
              <Label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </Label>
              <Input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm mt-1"
                placeholder="Choose a username"
                value={formData.username}
                onChange={handleChange}
              />
              {errors["username"] && (
                <p className="text-red-500 text-xs mt-1">
                  {errors["username"]}
                </p>
              )}
            </div>
            <div>
              <Label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm mt-1"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleChange}
              />
              {errors["email"] && (
                <p className="text-red-500 text-xs mt-1">{errors["email"]}</p>
              )}
            </div>
            <div>
              <Label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm mt-1"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors["password"] && (
                <p className="text-red-500 text-xs mt-1">
                  {errors["password"]}
                </p>
              )}
            </div>
            <div>
              <Label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm mt-1"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors["confirmPassword"] && (
                <p className="text-red-500 text-xs mt-1">
                  {errors["confirmPassword"]}
                </p>
              )}
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Sign Up
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
