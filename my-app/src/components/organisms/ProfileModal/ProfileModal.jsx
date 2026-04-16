'use client'
import { useForm } from 'react-hook-form';
import {useMutation, useQuery} from '@tanstack/react-query';
import {updateProfile, logout, getMe} from '@/lib/api';
import useAuthStore from '@/store/useAuthStore';
import Modal from '@/components/atoms/Modal/Modal';
import Button from '@/components/atoms/Button/Button';
import Image from "next/image";
import {useEffect, useState} from "react";

const ProfileModal = ({ isOpen, onClose }) => {
    const { user, login, token,isLoggedIn,openFeedback } = useAuthStore();

    const { register, handleSubmit, reset, watch, setValue, formState: { errors, isDirty, isValid } } = useForm({
        mode: "onSubmit",
        reValidateMode: "onChange",
        defaultValues: {
            full_name: '',
            email: user?.email,
            mobile_number: '',
            age: '',
        }
    });

    const avatarFile = watch('avatar');
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (avatarFile && avatarFile.length > 0) {
            const file = avatarFile[0];
            setPreview(URL.createObjectURL(file));
        }
    }, [avatarFile]);

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

    const handleClose = () => {
        reset();
        const isIncomplete = !userData?.profileComplete;

        if (isIncomplete) openFeedback('profile');
        onClose();
        setPreview(null);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file) {
            setValue('avatar', [file], { shouldValidate: true });
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose}>
            <div className='w-[460px] rounded-[12px] p-[50px] flex flex-col gap-[24px] bg-white'>

                <div className='flex flex-col gap-1.5 items-center'>
                    <h1 className='font-["Inter"] font-semibold text-[32px] leading-[100%] tracking-normal text-center text-[#141414]'>Profile</h1>
                </div>

                <div className='flex gap-3 items-center'>
                    <button
                        className='relative w-[56px] h-[56px] cursor-default'
                    >

                        <div className='w-full h-full rounded-full overflow-hidden border-[1.5px] border-transparent hover:border-[#B7B3F4] transition-all duration-300 bg-[#EEEDFC] flex items-center justify-center'>

                            {userData?.avatar ? (
                                <Image
                                    src={userData?.avatar}
                                    alt={user?.username}
                                    fill
                                    className='object-cover rounded-full'
                                />
                            ) : (
                                <Image
                                    src='/user_vector.svg'
                                    alt={user?.username}
                                    width={40}
                                    height={40}
                                    className='object-cover'
                                />
                            )}
                        </div>

                        <Image
                            src={userData?.profileComplete ? '/complete_ball_vector.svg' : '/incomplete_ball_vector.svg'}
                            alt='status'
                            width={15}
                            height={15}
                            className='absolute -right-[0px] -bottom-[0px]'
                        />
                    </button>
                    <div className='flex flex-col gap-1 items-start'>
                        <span className='font-["inter"] font-semibold text-[20px] leading-[24px] tracking-normal align-middle text-[#0A0A0A]'>{userData?.username}</span>
                        <span className={`pl-0.5 ${userData?.profileComplete ? 'text-[#1DC31D]' : 'text-[#F4A316]'} font-inter font-normal text-[10px] leading-[100%] tracking-normal`}>{userData?.profileComplete ? 'Profile is Complete' : 'Incomplete Profile'}</span>
                    </div>
                </div>

                <form onSubmit={handleSubmit((data) => mutate(data))} noValidate className='flex flex-col gap-4'>

                    <div className='flex flex-col gap-3'>
                        <div className='flex flex-col gap-[5px]'>
                            <div className='flex flex-col gap-2'>
                                <label className='font-["Inter"] font-medium text-[14px] leading-[100%] tracking-normal align-middle text-[#3D3D3D]'>Full Name</label>
                                <input
                                    type='text'
                                    placeholder={userData?.fullName}
                                    {...register('full_name', {
                                        required: 'Name is required',
                                        minLength: {
                                            value: 3,
                                            message: 'Name must be at least 3 characters'
                                        },
                                        maxLength: {
                                            value: 50,
                                            message: 'Name must not exceed 50 characters'
                                        },
                                        pattern: {
                                            value: /^[A-Za-zა-ჰ\s'-]+$/,
                                            message: 'Name can only contain letters and spaces'
                                        },
                                        validate: (value) => {
                                            if (!value || !value.trim()) return 'Name is required';

                                            return true;
                                        }
                                    })}
                                    className={`outline-none ${errors.full_name ? 'border-[#F4161A] text-[#F4161A] placeholder:text-[#F4161A]' : 'hover:border-[#ADADAD] border-[#D1D1D1] hover:placeholder:text-[#D1D1D1] focus:placeholder:text-[#F5F5F5] placeholder:text-[#8A8A8A] focus:text-[#3D3D3D] focus:border-[#8A8A8A]'} w-full bg-[#F5F5F5] transition-all duration-500 border-[1.5px] border-[#D1D1D1] rounded-lg pl-[13px] pr-[15px] py-3 font-["Inter"] font-medium text-[14px] leading-[150%] tracking-normal text-[#8A8A8A]`}
                                />
                            </div>
                            {errors.full_name && <span className='text-[#F4161A] text-xs'>{errors.full_name.message}</span>}
                        </div>

                        <div className='flex flex-col gap-[5px]'>
                            <div className='flex flex-col gap-2'>
                                <label className='font-["Inter"] font-medium text-[14px] leading-[100%] tracking-normal align-middle text-[#3D3D3D]'>Email</label>
                                <input
                                    type='email'
                                    value={userData?.email || ''}
                                    placeholder={userData?.email}
                                    {...register('email')}
                                    disabled
                                    className='w-full bg-[#F5F5F5] transition-all duration-300 border-[1.5px] border-[#D1D1D1] rounded-lg pl-[13px] pr-[15px] py-3 font-["Inter"] font-medium text-[14px] leading-[150%] tracking-normal text-[#ADADAD]'
                                />
                            </div>
                            {errors.email && <span className='text-[#F4161A] text-xs'>{errors.email.message}</span>}
                        </div>

                        <div className='flex gap-2 w-full'>
                            <div className='flex flex-col gap-1 w-[267px] shrink-0'>
                                <label className='font-["Inter"] font-medium text-[14px] leading-[100%] tracking-normal align-middle text-[#3D3D3D]'>Mobile Number</label>
                                <div className="relative flex items-center">
                                    <span className='absolute left-3 top-[17px] font-["Inter"] font-medium text-[14px] leading-[100%] tracking-normal align-middle text-[#D1D1D1]'>+995</span>

                                    <input
                                        type='tel'
                                        {...register('mobile_number', {
                                            required: 'Mobile number is required',
                                            validate: (value) => {
                                                if (!value) return 'Mobile number is required';

                                                const cleaned = value.replace(/\s/g, '');

                                                if (!/^\d+$/.test(cleaned)) {
                                                    return 'Please enter only numbers';
                                                }

                                                if (cleaned.length !== 9) {
                                                    return 'Mobile number must be exactly 9 digits';
                                                }

                                                if (!cleaned.startsWith('5')) {
                                                    return 'Georgian mobile numbers must start with 5';
                                                }

                                                return true;
                                            }
                                        })}
                                        placeholder={userData?.mobileNumber || ''}
                                        onInput={(e) => {
                                            if (e.target.value.length > 9) {
                                                e.target.value = e.target.value.slice(0, 9);
                                            }
                                        }}
                                        className={`outline-none duration-300 transition-all ${errors.mobile_number  ? 'border-[#F4161A] text-[#F4161A] placeholder:text-[#F4161A]' : 'hover:border-[#ADADAD] border-[#D1D1D1] hover:placeholder:text-[#D1D1D1] focus:placeholder:text-[#F5F5F5] placeholder:text-[#8A8A8A] focus:text-[#3D3D3D] focus:border-[#8A8A8A]'} w-full bg-[#FFFFFF]  border-[1.5px] border-[#D1D1D1] rounded-lg pl-[50px] pr-[15px] py-3 font-["Inter"] font-medium text-[14px] leading-[150%] tracking-normal text-[#8A8A8A]`}
                                    />
                                </div>
                                {errors.mobile_number && <span className='text-[#F4161A] text-xs'>{errors.mobile_number.message}</span>}
                            </div>

                            <div className='flex flex-col gap-1'>
                                <label className={`font-["Inter"] font-medium text-[14px] leading-[100%] tracking-normal align-middle text-[#3D3D3D] ${errors.age ? 'text-[#F4161A]' : 'text-[#130E67]'}`}>Age</label>
                                <input
                                    type='number'
                                    {...register('age', {
                                        required: 'Age is required',
                                        validate: (value) => {
                                            if (value === '' || value === null) return 'Age is required';

                                            const num = Number(value);

                                            if (isNaN(num)) return 'Age must be a number';

                                            return true;
                                        },
                                        min: {
                                            value: 16,
                                            message: 'You must be at least 16 years old to enroll'
                                        },
                                        max: {
                                            value: 120,
                                            message: 'Please enter a valid age'
                                        }
                                    })}
                                    placeholder={userData?.age || ''}
                                    onInput={(e) => {
                                        if (e.target.value.length > 3) {
                                            e.target.value = e.target.value.slice(0, 3);
                                        }
                                    }}
                                    className={`outline-none duration-300 transition-all ${errors.age  ? 'border-[#F4161A] text-[#F4161A] placeholder:text-[#F4161A]' : 'hover:border-[#ADADAD] border-[#D1D1D1] hover:placeholder:text-[#D1D1D1] focus:placeholder:text-[#F5F5F5] placeholder:text-[#8A8A8A] focus:text-[#3D3D3D] focus:border-[#8A8A8A]'} w-full bg-[#FFFFFF]  border-[1.5px] border-[#D1D1D1] rounded-lg pl-[13px] pr-[15px] py-3 font-["Inter"] font-medium text-[14px] leading-[150%] tracking-normal text-[#8A8A8A]`}
                                />
                                {errors.age && <span className='text-[#F4161A] text-xs'>{errors.age.message}</span>}
                            </div>
                        </div>

                        <div className='flex flex-col gap-3'>
                            <label className='font-["Inter"] font-medium text-[14px] leading-[100%] tracking-normal align-middle text-[#3D3D3D]'>Upload Avatar</label>

                            <label
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                                className={`w-full justify-center items-center transition-all duration-500 ease-out flex flex-col rounded-[8px] border-[1.5px] border-[#D1D1D1] border gap-[8px] py-[30px] cursor-pointer hover:bg-[#EEEDFC] hover:border-[#DDDBFA] focus:bg-[#DDDBFA] focus:border-[#B7B3F4] ${preview ? 'bg-[#EEEDFC] border-[#DDDBFA]' : 'bg-white'} transition-colors overflow-hidden relative min-h-[160px]`}
                            >

                                {preview ? (
                                    <div className="flex w-full px-[40px] items-center gap-[10px]">
                                        <div className="relative w-[54px] h-[54px] rounded-full overflow-hidden">
                                            <Image
                                                src={preview}
                                                alt="Preview"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className='flex flex-col gap-0.5'>
                                            <div className='flex flex-col'>
                                                <span className='font-["Inter"] h-[15px] font-normal text-[12px] leading-[100%] tracking-normal text-[#525252]'>
                                                    {avatarFile[0].name}
                                                </span>
                                                <span className='font-["Inter"] h-3 font-normal text-[10px] leading-[100%] tracking-normal text-[#ADADAD]'>
                                                     Size - {(avatarFile[0].size / (1024 * 1024)).toFixed(2)} MB
                                                </span>

                                            </div>

                                            <span className="font-inter h-3 font-medium text-[10px] leading-[100%] tracking-normal underline decoration-solid underline-offset-[25%] decoration-0 text-[#4F46E5]">Change</span>

                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <Image src={'/upload_vector.svg'} alt={'Upload'} width={34} height={34}/>
                                        <div className='flex flex-col gap-1 text-center'>
                                            <span className='text-sm font-semibold text-[#666666]'>
                                                Drag and drop or <span className='underline text-[#4F46E5]'>Upload file</span>
                                            </span>
                                            <span className='text-xs text-[#ADADAD]'>
                                                JPG, PNG or WebP
                                            </span>
                                        </div>
                                    </>
                                )}

                                <input
                                    type='file'
                                    accept='image/*'
                                    className='hidden'
                                    {...register('avatar')}
                                />
                            </label>
                        </div>

                    </div>

                    {isError && (
                        <p className='text-[#F4161A] text-sm text-center'>
                            {error?.response?.data?.message || 'Failed to update profile.'}
                        </p>
                    )}

                    <Button type='submit' variant='nextAuth' disabled={isPending}>
                        {isPending ? 'Saving...' : 'Update Profile'}
                    </Button>

                </form>
            </div>
        </Modal>
    );
};

export default ProfileModal;