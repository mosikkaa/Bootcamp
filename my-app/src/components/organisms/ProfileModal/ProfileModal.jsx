'use client'
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { updateProfile,logout} from '@/lib/api';
import useAuthStore from '@/store/useAuthStore';
import Modal from '@/components/atoms/Modal/Modal';
import Button from '@/components/atoms/Button/Button';

const ProfileModal = ({ isOpen, onClose }) => {
    const { user, login, token } = useAuthStore();

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            full_name: user?.fullName || '',
            mobile_number: user?.mobileNumber || '',
            age: user?.age || '',
        }
    });

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
                    <h1 className='text-xl font-bold'>Complete Your Profile</h1>
                    <span className='text-sm text-gray-500'>Fill in your details to enroll in courses</span>
                </div>

                <form onSubmit={handleSubmit((data) => mutate(data))} noValidate className='flex flex-col gap-4'>

                    <div className='flex flex-col gap-1'>
                        <label className='text-sm font-medium'>Full Name*</label>
                        <input
                            type='text'
                            placeholder='John Doe'
                            {...register('full_name', { required: 'Full name is required' })}
                            className='w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500'
                        />
                        {errors.full_name && <span className='text-red-500 text-xs'>{errors.full_name.message}</span>}
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label className='text-sm font-medium'>Mobile Number*</label>
                        <input
                            type='tel'
                            placeholder='555123456'
                            {...register('mobile_number', { required: 'Mobile number is required' })}
                            className='w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500'
                        />
                        {errors.mobile_number && <span className='text-red-500 text-xs'>{errors.mobile_number.message}</span>}
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label className='text-sm font-medium'>Age*</label>
                        <input
                            type='number'
                            placeholder='25'
                            {...register('age', {
                                required: 'Age is required',
                                min: { value: 1, message: 'Invalid age' },
                                max: { value: 120, message: 'Invalid age' }
                            })}
                            className='w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500'
                        />
                        {errors.age && <span className='text-red-500 text-xs'>{errors.age.message}</span>}
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label className='text-sm font-medium'>Avatar</label>
                        <input
                            type='file'
                            accept='image/*'
                            {...register('avatar')}
                            className='w-full border border-gray-300 rounded-lg px-3 py-2 text-sm'
                        />
                    </div>

                    {isError && (
                        <p className='text-red-500 text-sm text-center'>
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