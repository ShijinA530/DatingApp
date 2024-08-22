import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];
const SUPPORTED_REEL_FORMATS = ['video/mp4', 'video/ogg', 'video/webm', 'video/quicktime'];

const schema = yup.object().shape({
    
    bio: yup.string().required('Bio is required'),
    dob: yup.date().required('Date of Birth is required'),
    hobbies: yup.string().required('Hobbies are required'),
    interests: yup.string().required('Interests are required'),
    smoking: yup.string().required('Smoking habits are required'),
    drinking: yup.string().required('Drinking habits are required'),
    qualification: yup.string().required('Qualifications are required'),
    gender: yup.string().required('Gender is required'),
    profile: yup.mixed().required('Image is required')
        .test('required', 'Provide one profile pic', value => value && value.length === 1)
        .test('fileFormat', 'Unsupported file format', value => value && value.length === 1 && SUPPORTED_FORMATS.includes(value[0].type)),
    additionalImg: yup.mixed()
        .required('Images are required')
        .test('fileSize', '3 images are required', (value) => value && value.length === 3),
    reel: yup.mixed().required('Reel is required')
        .test('required', 'Provide a short reel', value => value && value.length === 1)
        .test('fileFormat', 'Unsupported file format', value => value && value.length === 1 && SUPPORTED_REEL_FORMATS.includes(value[0].type)),
});

const PersonalDetails = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        setLoading(true);
        const formData = new FormData();
        formData.append('bio', data.bio);
        formData.append('dob', data.dob);
        formData.append('hobbies', data.hobbies);
        formData.append('interests', data.interests);
        formData.append('smoking', data.smoking);
        formData.append('drinking', data.drinking);
        formData.append('qualification', data.qualification);
        formData.append('gender', data.gender);

        if (data.profile && data.profile.length > 0) {
            formData.append('profile', data.profile[0]);
        }

        if (data.additionalImg && data.additionalImg.length > 0) {
            Array.from(data.additionalImg).forEach((img) => {
                formData.append('additionalImg', img);
            });
        }

        if (data.reel && data.reel.length > 0) {
            formData.append('reel', data.reel[0]);
        }

        console.log([...formData]);
        axios.post('http://localhost:5000/api/v1/users/profile-details', formData, {withCredentials: true})
            .then(res => {
                toast.success(res?.data?.message, { duration: 1000 });
                if (res.data.success) {
                    setTimeout(() => navigate('/job_status'), 1000);
                }
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                toast.error(err?.response?.data?.message, { duration: 1000 });
            });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 bg-[url('LandingPagebackgroundblur.png')] bg-no-repeat bg-cover bg-fixed backdrop-blur-3xl">
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            <div className="flex flex-col min-h-screen p-4 lg:w-2/5">
                <div className="bg-white p-6 mt-14 mb-10 rounded-lg shadow-lg w-full max-w-md mx-auto">
                    <h2 className="mb-5 text-2xl font-bold text-center">Personal Details</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                     <div className="mb-4">
                            <label htmlFor="bio" className="block text-gray-700">Bio</label>
                            <input type="text" id="bio" {...register('bio')} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-black sm:text-sm" />
                            {errors.bio && <p className="text-red-600">{errors.bio.message}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="dob" className="block text-gray-700">DOB</label>
                            <input type="date" id="dob" {...register('dob')} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-black sm:text-sm" />
                            {errors.dob && <p className="text-red-600">{errors.dob.message}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="hobbies" className="block text-gray-700">Hobbies</label>
                            <input type="text" id="hobbies" {...register('hobbies')} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-black sm:text-sm" />
                            {errors.hobbies && <p className="text-red-600">{errors.hobbies.message}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="interests" className="block text-gray-700">Interests</label>
                            <input type="text" id="interests" {...register('interests')} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-black sm:text-sm" />
                            {errors.interests && <p className="text-red-600">{errors.interests.message}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="smoking" className="block text-gray-700">Smoking Habits</label>
                            <input type="text" id="smoking" {...register('smoking')} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-black sm:text-sm" />
                            {errors.smoking && <p className="text-red-600">{errors.smoking.message}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="drinking" className="block text-gray-700">Drinking Habits</label>
                            <input type="text" id="drinking" {...register('drinking')} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-black sm:text-sm" />
                            {errors.drinking && <p className="text-red-600">{errors.drinking.message}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="qualifications" className="block text-gray-700">Qualifications</label>
                            <input type="text" id="qualifications" {...register('qualification')} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-black sm:text-sm" />
                            {errors.qualification && <p className="text-red-600">{errors.qualification.message}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="gender" className="block text-gray-700">Gender</label>
                            <select id="gender" {...register('gender')} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-black sm:text-sm">
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                            {errors.gender && <p className="text-red-600">{errors.gender.message}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="profile" className="block text-gray-700">Profile Picture</label>
                            <input type="file" id="profile" {...register('profile')} accept="image/*" className="mt-1 block w-full text-gray-700" />
                            {errors.profile && <p className="text-red-600">{errors.profile.message}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="additionalImg" className="block text-gray-700">Additional Images (3 required)</label>
                            <input type="file" id="additionalImg" {...register('additionalImg')} accept="image/*" multiple className="mt-1 block w-full text-gray-700" />
                            {errors.additionalImg && <p className="text-red-600">{errors.additionalImg.message}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="reel" className="block text-gray-700">Upload Reel</label>
                            <input type="file" id="reel" {...register('reel')} accept="video/*" className="mt-1 block w-full text-gray-700" />
                            {errors.reel && <p className="text-red-600">{errors.reel.message}</p>}
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-2 bg-black hover:bg-gray-800 text-white px-4 rounded-md transition-colors duration-300 ease-in-out ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'Loading...' : 'Submit'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PersonalDetails;
