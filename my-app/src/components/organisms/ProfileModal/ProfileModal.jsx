'use client'
import { useForm } from 'react-hook-form';
import {useMutation, useQuery} from '@tanstack/react-query';
import {updateProfile, logout, getMe} from '@/lib/api';
import useAuthStore from '@/store/useAuthStore';
import Modal from '@/components/atoms/Modal/Modal';
import Button from '@/components/atoms/Button/Button';
import Image from "next/image";
import {useEffect} from "react";

const ProfileModal = ({ isOpen, onClose }) => {
    const { user, login, token,isLoggedIn } = useAuthStore();

    const { register, handleSubmit, reset, watch, formState: { errors, isDirty, isValid } } = useForm({
        mode: "onChange",
        defaultValues: {
            full_name: '',
            email: user?.email,
            mobile_number: '',
            age: '',
        }
    });

    const { data: userData, isLoading } = useQuery({
        queryKey: ["me"],
        queryFn: getMe,
        enabled: isLoggedIn && isOpen,
    });

    useEffect(() => {
        if (userData?.data) {
            reset({
                full_name: userData?.data.fullName || '',
                email: userData?.data.email || '',
                mobile_number: userData?.data.mobileNumber?.replace('+995', '') || '',
                age: userData?.data.age || '',
            });
        }
    }, [userData?.data, reset]);

    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: (data) => {
            const formData = new FormData();
            formData.append('full_name', data.full_name);
            formData.append('mobile_number', data.mobile_number);
            formData.append('age', data.age);
            if (data.avatar?.[0]) formData.append('avatar', data.avatar[0]);
            return updateProfile(formData);
        },
        onSuccess: (updatedUser) => {
            login({ token, user: updatedUser });
            onClose();
        },
    });


    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className='w-[460px] rounded-[12px] p-[50px] flex flex-col gap-[24px] bg-white'>

                <div className='flex flex-col gap-1.5 items-center'>
                    <h1 className='text-xl font-bold'>Profile</h1>
                </div>

                <div className='flex gap-3 items-center'>
                    <Image
                        src={userData?.avatar || userData?.profileComplete ? '/complete_vector.svg' : '/incomplete_vector.svg'}
                        alt={userData?.username}
                        width={56}
                        height={56}
                        className='object-cover'
                    />
                    <div className='flex flex-col teims-center'>
                        <span>{userData?.username}</span>
                        <span className={`${userData?.profileComplete ? 'text-[#1DC31D]' : 'text-[#F4A316]'}`}>{userData?.profileComplete ? 'Profile is Complete' : 'Incomplete Profile'}</span>
                    </div>
                </div>

                <form onSubmit={handleSubmit((data) => mutate(data))} noValidate className='flex flex-col gap-4'>

                    <div className='flex flex-col gap-[5px]'>
                        <div className='flex flex-col gap-2'>
                            <label className='text-sm font-medium'>Full Name</label>
                            <input
                                type='text'
                                placeholder='username'
                                {...register('full_name', { required: 'Full name is required' })}
                                className='w-full border-[1.5px] border-gray-300 rounded-lg px-3 py-3 text-sm'
                            />
                        </div>
                        {errors.full_name && <span className='text-[#F4161A] text-xs'>{errors.full_name.message}</span>}
                    </div>

                    <div className='flex flex-col gap-[5px]'>
                        <div className='flex flex-col gap-2'>
                            <label className='text-sm font-medium'>Email</label>
                            <input
                                type='text'
                                placeholder='Email@gmail.com'
                                {...register('email', { required: 'Email is required' })}
                                className='w-full border-[1.5px] border-gray-300 rounded-lg px-3 py-3 text-sm'
                            />
                        </div>
                        {errors.email && <span className='text-[#F4161A] text-xs'>{errors.email.message}</span>}
                    </div>

                    <div className='flex gap-2 w-full'>
                        <div className='flex flex-col gap-1 w-[267px] shrink-0'>
                            <label className='text-sm font-medium'>Mobile Number</label>
                            <div className="relative flex items-center">
                                <span className="absolute left-3 top-3.4 text-sm text-gray-500 pointer-events-none">+995</span>

                                <input
                                    type='tel'
                                    placeholder=''
                                    {...register('mobile_number', {
                                        required: 'Mobile number is required',
                                        pattern: {
                                            value: /^[0-9]{9}$/,
                                            message: 'Please enter a valid 9-digit number'
                                        }
                                    })}
                                    className='w-full border-[1.5px] border-gray-300 rounded-lg pl-12 pr-3 py-3 text-sm'
                                />
                            </div>
                            {errors.mobile_number && <span className='text-[#F4161A] text-xs'>{errors.mobile_number.message}</span>}
                        </div>

                        <div className='flex flex-col gap-1'>
                            <label className={`text-sm font-medium ${errors.age ? 'text-[#F4161A]' : 'text-[#130E67]'}`}>Age</label>
                            <input
                                type='number'
                                placeholder='25'
                                {...register('age', {
                                    required: 'Age is required',
                                    min: { value: 1, message: 'Invalid age' },
                                    max: { value: 120, message: 'Invalid age' }
                                })}
                                className={`w-full border-[1.5px] rounded-lg pl-3 pr-[15px] py-3 text-sm focus:outline-none transition-colors${errors.age ? 'border-[#F4161A] text-[#F4161A] focus:ring-[#F4161A]/20' : 'border-gray-300 text-black'}`}
                            />
                            {errors.age && <span className='text-[#F4161A] text-xs'>{errors.age.message}</span>}
                        </div>
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label className='text-sm font-medium text-[#130E67]'>Upload Avatar</label>

                        <label className='w-full items-center flex flex-col rounded-[8px] border-[1.5px] border-[#D1D1D1] gap-[8px] py-[30px] bg-white'>

                            <Image src={'/upload_vector.svg'} alt={'Upload'} width={34} height={34}/>

                            <div className='flex flex-col gap-1 text-center'>
                               <span className='text-sm font-semibold text-[#666666]'>
                                   Drag and drop or <a className='cursor-pointer underline text-[#4F46E5]'>Upload file</a>
                               </span>
                                <span className='text-xs text-[#ADADAD]'>
                                   JPG, PNG or WebP
                               </span>
                            </div>

                            <input
                                type='file'
                                accept='image/*'
                                className='hidden'
                                {...register('avatar')}
                            />
                        </label>
                    </div>

                    {isError && (
                        <p className='text-[#F4161A] text-sm text-center'>
                            {error?.response?.data?.message || 'Failed to update profile.'}
                        </p>
                    )}

                    <Button type='submit' variant='nextAuth' disabled={isPending}>
                        {isPending ? 'Saving...' : 'Save Profile'}
                    </Button>

                </form>
            </div>
        </Modal>
    );
};

export default ProfileModal;