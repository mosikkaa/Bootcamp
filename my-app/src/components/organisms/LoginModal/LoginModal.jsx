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
                        <h1 className='text-xl font-bold'>Welcome Back</h1>
                        <span className='text-sm text-gray-500'>Log in to continue your learning</span>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} noValidate className='flex flex-col gap-4'>

                        <div className='flex flex-col gap-1'>
                            <label className='text-sm font-medium'>Email*</label>
                            <input
                                type='email'
                                placeholder='you@example.com'
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' }
                                })}
                                className='w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500'
                            />
                            {errors.email && (
                                <span className='text-red-500 text-xs'>{errors.email.message}</span>
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
                                className='w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500'
                            />
                            {errors.password && (
                                <span className='text-red-500 text-xs'>{errors.password.message}</span>
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