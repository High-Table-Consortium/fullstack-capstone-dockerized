'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/authContent';
import Navbar from '../../components/Navbar';

export default function AccountInfo() {
  const { user, token, isAuthenticated, setMessage, message, isLoading, setUser } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const baseURL = "http://localhost:3001/api";

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setPhone(user.phone);
      setCountry(user.country);
      setCity(user.city);
      setPostalCode(user.postalCode);
      setImageFile(user.image);
    }
  }, [user]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    const payload = {
      firstName,
      lastName,
      city,
      country,
      phone,
      postalCode,
      imageFile
    };

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.put(`${baseURL}/user/profile`, payload, config);
      setUser(response.data);
      setMessage('Profile updated successfully!');
    } catch (error) {
      const errorResponse = error.response?.data?.message || 'Error updating profile.';
      setErrorMessage(errorResponse);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg mt-10 max-w-4xl">
        <h2 className="text-3xl font-semibold mb-6">Personal Information</h2>

        {message && <p className="mb-4 text-green-500">{message}</p>}
        {errorMessage && <p className="mb-4 text-red-500">{errorMessage}</p>}

        {/* Profile Section */}
        <div className="flex items-center space-x-6 mb-6">
          <img src={user?.image} alt="Profile" className="w-24 h-24 rounded-full border-2 border-gray-300" />
          <div>
            <h3 className="text-xl font-bold">{firstName} {lastName}</h3>
            <p className="text-gray-500">{city}, {country}</p>
          </div>
        </div>

        {/* Form Section */}
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold">Email Address</label>
              <input
                type="email"
                value={email}
                readOnly
                className="w-full p-2 border bg-gray-100 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold">Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold">Country</label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold">City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </div>

          {/* Delete Account Section */}
          <div className="bg-red-50 p-4 mt-6 border border-red-300 rounded-lg">
            <h4 className="text-lg font-semibold text-red-600">Delete Account</h4>
            <p className="text-sm text-red-500 mt-1">
              After making a deletion request, you will have <strong>6 months</strong> to maintain this account.
              This action is irreversible, and you will lose access to all your data.
            </p>
            <button
              type="button"
              className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg"
            >
              Delete Account
            </button>
          </div>
        </form>
      </div>
    </>
  );
}