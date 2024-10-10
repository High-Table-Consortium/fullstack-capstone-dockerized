import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const AccountInfo = () => {
  const { register, handleSubmit, setValue, formState: { errors, isDirty } } = useForm();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.get('/api/users/profile', config);
        const userData = response.data.data;

        setUser(userData);
        // Set form values
        setValue('firstName', userData.firstName);
        setValue('lastName', userData.lastName);
        setValue('email', userData.email);
        setValue('city', userData.city);
        setValue('image', userData.image);
      } catch (error) {
        setErrorMessage('Error fetching user data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [setValue]);

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        setErrorMessage('Invalid file type. Only JPEG or PNG is allowed.');
        setImageFile(null);
      } else if (file.size > 2 * 1024 * 1024) { // 2MB limit
        setErrorMessage('File size exceeds 2MB.');
        setImageFile(null);
      } else {
        setImageFile(file);
        setErrorMessage('');
      }
    }
  };

  // Handle form submission
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setErrorMessage('');
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const formData = new FormData();
      formData.append('firstName', data.firstName);
      formData.append('lastName', data.lastName);
      formData.append('city', data.city);
      if (imageFile) {
        formData.append('image', imageFile);
      }

      await axios.put('/api/users/profile', formData, config);
      setMessage('Profile updated successfully!');
    } catch (error) {
      const errorResponse = error.response?.data?.message || 'Error updating profile. Please check your inputs and try again.';
      setErrorMessage(errorResponse);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle account deletion
  const handleDeleteAccount = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.delete('/api/users/profile', config);
      localStorage.removeItem('token');
      setMessage('Account deleted successfully.');
    } catch (error) {
      const errorResponse = error.response?.data?.message || 'Error deleting account. Please try again later.';
      setErrorMessage(errorResponse);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Account Info</h1>
      <div aria-live="polite">
        {message && <p style={{ color: 'green' }}>{message}</p>}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div>
          <label htmlFor="image">Profile Picture:</label>
          {user.image && <img src={user.image} alt="Profile" className="profile-picture" />}
          <input type="file" {...register('image')} onChange={handleImageChange} />
          {imageFile && <p>Selected Image: {imageFile.name}</p>}
        </div>

        <div>
          <label>Username:</label>
          <input type="text" value={user.username} disabled />
        </div>

        <div>
          <label htmlFor="firstName">First Name:</label>
          <input 
            type="text" 
            {...register('firstName', { 
              required: 'First Name is required',
              minLength: { value: 2, message: 'First Name must be at least 2 characters' }
            })} 
          />
          {errors.firstName && <p style={{ color: 'red' }}>{errors.firstName.message}</p>}
        </div>

        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input 
            type="text" 
            {...register('lastName', { 
              required: 'Last Name is required',
              minLength: { value: 2, message: 'Last Name must be at least 2 characters' }
            })} 
          />
          {errors.lastName && <p style={{ color: 'red' }}>{errors.lastName.message}</p>}
        </div>

        <div>
          <label>Email:</label>
          <input type="email" value={user.email} disabled />
        </div>

        <div>
          <label htmlFor="city">Current City:</label>
          <input 
            type="text" 
            {...register('city', { 
              required: 'City is required',
              minLength: { value: 2, message: 'City must be at least 2 characters' }
            })} 
          />
          {errors.city && <p style={{ color: 'red' }}>{errors.city.message}</p>}
        </div>

        <button type="submit" disabled={isSubmitting || !isDirty}>
          {isSubmitting ? 'Submitting...' : 'Update Details'}
        </button>
      </form>

      <button onClick={handleDeleteAccount}>Delete Account</button>
    </div>
  );
};

export default AccountInfo;
