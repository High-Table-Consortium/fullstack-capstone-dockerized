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
  const [bio, setBio] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [taxId, setTaxId] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showLoginMessage, setShowLoginMessage] = useState(true);
  const baseURL = "http://localhost:3001/api";

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setPhone(user.phone);
      setBio(user.bio);
      setCountry(user.country);
      setCity(user.city);
      setPostalCode(user.postalCode);
      setTaxId(user.taxId);
      setImageFile(user.image);
    }
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        setErrorMessage('Invalid file type. Only JPEG or PNG is allowed.');
        setImageFile(null);
      } else if (file.size > 2 * 1024 * 1024) {
        setErrorMessage('File size exceeds 2MB.');
        setImageFile(null);
      } else {
        setImageFile(file);
        setErrorMessage('');
      }
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    // Create payload object
    const payload = {
      firstName,
      lastName,
      city,
      country,
      phone,
      bio,
      postalCode,
      taxId,
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

      // Update user state with the new data from server
      setUser(response.data);

      // Show success message
      setMessage('Profile updated successfully!');
      setIsEditing(false);

      // Reload the page to reflect the changes
      window.location.reload();
    } catch (error) {
      const errorResponse = axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : 'Error updating profile. Please check your inputs and try again.';
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

  if (!isAuthenticated || !user) {
    return (
      showLoginMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center space-y-4 w-full max-w-sm mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800">Please Log In</h2>
            <p className="text-gray-600">You need to log in to access your account information.</p>
            <button
              onClick={() => setShowLoginMessage(false)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition-colors"
            >
              Dismiss
            </button>
          </div>
        </div>
      )
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
        <h2 className="text-2xl font-semibold mb-6">My Profile</h2>
        {message && <p className="mb-4 text-green-500">{message}</p>}
        {errorMessage && <p className="mb-4 text-red-500">{errorMessage}</p>}

        {/* Profile Header */}
        <div className="flex items-center justify-between mb-6 p-4 border rounded-lg bg-gray-50 shadow-md transition-shadow hover:shadow-lg">
          <div className="flex items-center space-x-4">
            <img src={user.image} alt={`${firstName} ${lastName}`} className="w-20 h-20 rounded-full border-2 border-blue-500 object-cover" />
            <div>
              <h3 className="text-xl font-bold">{firstName} {lastName}</h3>
              <p className="text-sm text-gray-500">{city ? `${city}, ${country}` : 'Location'}</p>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 transition-colors"
          >
            Edit
          </button>
        </div>

        {/* Personal Information Section */}
        <form onSubmit={onSubmit} className="mb-6 p-4 border rounded-lg bg-gray-50 shadow-md transition-shadow hover:shadow-lg">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-lg">Personal Information</h4>
            {isEditing && <button type="button" onClick={() => setIsEditing(false)} className="text-blue-500 hover:underline text-sm">Cancel</button>}
            {isEditing && <button type="submit" className="text-blue-500 hover:underline text-sm">{isSubmitting ? 'Saving...' : 'Save'}</button>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm text-gray-700">
            <div>
              <p className="font-semibold">First Name</p>
              {isEditing ? (
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="border rounded p-2 w-full"
                />
              ) : (
                <p>{firstName}</p>
              )}
            </div>
            <div>
              <p className="font-semibold">Last Name</p>
              {isEditing ? (
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="border rounded p-2 w-full"
                />
              ) : (
                <p>{lastName}</p>
              )}
            </div>
            <div>
              <p className="font-semibold">Email address</p>
              <p>{email}</p>
            </div>
            
          </div>
        </form>

        {/* Address Section */}
        <div className="p-4 border rounded-lg bg-gray-50 shadow-md transition-shadow hover:shadow-lg">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-lg">Address</h4>
            <button className="text-blue-500 hover:underline text-sm">Edit</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm text-gray-700">
            <div>
              <p className="font-semibold">Country</p>
              <p>{country || 'Not Provided'}</p>
            </div>
            <div>
              <p className="font-semibold">City / State</p>
              <p>{city || 'Not Provided'}</p>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
