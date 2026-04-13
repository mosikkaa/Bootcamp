'use client'
import Modal from '@/components/atoms/Modal/Modal';
import Button from '@/components/atoms/Button/Button';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { login as loginUser } from '@/lib/api';
import useAuthStore from '@/store/useAuthStore';

const LoginModal = ({ isOpen, onClose, onSignUpOpen }) => {
    const { login, closeAll } = useAuthStore();

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            login(data);
            handleClose();
        },
        onError: (err) => {
            console.log("error response:", err.response?.data);
        }
    });

    const handleClose = () => {
        reset();
        closeAll();
        onClose();
    };

    const onSubmit = (data) => {
        mutate(data);
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose}>
            <div className='w-[460px] rounded-[12px] p-[50px] gap-[16px] flex flex-col bg-white'>
                <div className='flex flex-col gap-[24px]'>

                    <div className='flex flex-col gap-1.5 items-center'>
                        <h1 className='font-["Inter"] font-semibold text-[32px] leading-none tracking-normal text-center text-[#141414]'>Welcome Back</h1>
                        <span className='font-["Inter"] font-medium text-[14px] leading-none tracking-normal text-center text-[#666666]'>Log in to continue your learning</span>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} noValidate className='flex flex-col gap-4'>

                        <div className='flex flex-col gap-[5px]'>
                            <div className='flex flex-col gap-2'>
                                <label className='text-sm font-medium'>Email*</label>
                                <input
                                    type='email'
                                    placeholder='you@example.com'
                                    {...register('email', {
                                        required: 'Email is required',
                                        pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' }
                                    })}
                                    className={`w-[360px] h-[48px] border-[1.5px] border-solid rounded-[8px] focus:placeholder:translate-x-[4px] transition-all duration-300 flex items-center gap-[10px] pt-[12px] pr-[15px] pb-[12px] pl-[13px] placeholder:text-[#8A8A8A] focus:placeholder:text-[#F5F5F5] font-["Inter"] font-medium text-[14px] leading-none tracking-normal align-middle text-[#3D3D3D] outline-none ${errors.email  ? 'border-[#F4161A] text-[#F4161A] placeholder:text-[#F4161A]' : 'hover:border-[#ADADAD] border-[#D1D1D1] hover:placeholder:text-[#D1D1D1] focus:border-[#8A8A8A]'}`}
                                />
                            </div>
                            {errors.email && (
                                <span className='text-[#F4161A] font-["Inter"] font-normal text-[12px] leading-none tracking-n'>
                                    {errors.email.message}
                                </span>
                            )}
                        </div>

                        <div className='flex flex-col gap-1'>
                            <label className='text-sm font-medium'>Password*</label>
                            <input
                                type='password'
                                placeholder='Password'
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: { value: 6, message: 'Min 6 characters' }
                                })}
                                className={`w-[360px] h-[48px] border-[1.5px] border-solid rounded-[8px] focus:placeholder:translate-x-[4px] transition-all duration-300 flex items-center gap-[10px] pt-[12px] pr-[15px] pb-[12px] pl-[13px] placeholder:text-[#8A8A8A] focus:placeholder:text-[#F5F5F5] font-["Inter"] font-medium text-[14px] leading-none tracking-normal align-middle text-[#3D3D3D] outline-none ${errors.password  ? 'border-[#F4161A] text-[#F4161A] placeholder:text-[#F4161A]' : 'hover:border-[#ADADAD] border-[#D1D1D1] hover:placeholder:text-[#D1D1D1] focus:border-[#8A8A8A]'}`}
                            />
                            {errors.password && (
                                <span className='text-[#F4161A] font-["Inter"] font-normal text-[12px] leading-none tracking-n'>
                                    {errors.password.message}
                                </span>
                            )}
                        </div>

                        {isError && (
                            <p className='text-red-500 text-sm text-center'>
                                {error?.response?.data?.message || 'Invalid email or password.'}
                            </p>
                        )}

                        <Button
                            type='submit'
                            variant='nextAuth'
                            disabled={isPending}
                            className='w-full py-3'
                        >
                            {isPending ? 'Logging in...' : 'Log In'}
                        </Button>

                        <div className='flex items-center justify-center gap-3 w-full'>
                            <div className='flex w-[320px] items-center gap-2'>
                                <div className='flex-1 h-px bg-gray-200' />
                                <span className='text-sm text-gray-400'>or</span>
                                <div className='flex-1 h-px bg-gray-200' />
                            </div>
                        </div>

                        <p className='text-center text-sm'>
                            Don't have an account?{' '}
                            <button
                                type='button'
                                onClick={() => { handleClose(); onSignUpOpen(); }}
                                className='font-bold underline text-indigo-600'
                            >
                                Sign Up
                            </button>
                        </p>

                    </form>
                </div>
            </div>
        </Modal>
    );
};

export default LoginModal;