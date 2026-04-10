'use client'
import Modal from '@/components/atoms/Modal/Modal';
import Button from '@/components/atoms/Button/Button';
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { register as registerUser } from '@/lib/api';
import useAuthStore from '@/store/useAuthStore';

const steps = [
    {
        id: 'email',
        fields: [
            { field: 'email', label: 'Email*', type: 'email', placeholder: 'you@example.com', validation: { required: 'Email is required', pattern: { value: /^\S+@\S+$/, message: 'Invalid email' } } }
        ]
    },
    {
        id: 'passwords',
        fields: [
            { field: 'password', label: 'Password*', type: 'password', placeholder: 'Password', validation: { required: 'Password is required', minLength: { value: 6, message: 'Min 6 characters' } } },
            { field: 'confirmPassword', label: 'Confirm Password*', type: 'password', placeholder: '••••••••', validation: {} }
        ]
    },
    {
        id: 'username',
        fields: [
            { field: 'username', label: 'Username*', type: 'text', placeholder: 'johndoe', validation: { required: 'Username is required' } }
        ]
    }
];

const SignupModal = ({ isOpen, onClose, onLoginOpen }) => {
    const { login, closeAll } = useAuthStore();

    const [active, setActive] = useState(0);
    const [attemptedStep, setAttemptedStep] = useState(null);

    const { register, reset, handleSubmit, watch, trigger, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: '',
            username: ''
        }
    });

    const password = watch('password');

    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: (data) => {
            const formData = new FormData();
            formData.append('username', data.username);
            formData.append('email', data.email);
            formData.append('password', data.password);
            formData.append('password_confirmation', data.confirmPassword);
            return registerUser(formData);
        },
        onSuccess: (data) => {
            login(data);
            handleClose();
        },
        onError: (err) => {
            console.log("error response:", err.response?.data);
        }
    });

    const getColor = (index) => {
        if (index === active) return 'bg-[#B7B3F4]';
        if (index < active) return 'bg-[#4F46E5]';
        return 'bg-[#EEEDFC]';
    };

    const handleClose = () => {
        setActive(0);
        reset();
        closeAll();
        onClose();
    };

    const handleNext = async () => {
        const fields = steps[active].fields.map(f => f.field);
        const valid = await trigger(fields);
        if (!valid) {
            setAttemptedStep(active);
            return;
        }
        setAttemptedStep(null);
        setActive(prev => prev + 1);
    };

    const onSubmit = (data) => {
        mutate(data);
    };

    const currentFields = steps[active].fields;
    const isLastStep = active === steps.length - 1;

    return (
        <Modal isOpen={isOpen} onClose={handleClose}>
            <div className='w-[460px] rounded-[12px] p-[50px] gap-[16px] flex flex-col bg-white'>
                <div className='flex flex-col gap-[24px]'>

                    <div className='flex flex-col gap-1.5 items-center'>
                        <h1>Create Account</h1>
                        <span>Join and start learning today</span>
                    </div>

                    <div className='flex justify-between items-center'>
                        {steps.map((step) => (
                            <div key={step.id} className={`w-[114.67px] h-2 rounded-[30px] ${getColor(steps.indexOf(step))}`} />
                        ))}
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} noValidate className='flex flex-col gap-4'>

                        {currentFields.map((step) => (
                            <div key={step.field} className='flex flex-col gap-1'>
                                <label className='text-sm font-medium'>{step.label}</label>
                                <input
                                    type={step.type}
                                    placeholder={step.placeholder}
                                    {...register(
                                        step.field,
                                        step.field === 'confirmPassword'
                                            ? {
                                                required: 'Confirm your password',
                                                validate: (value) => value === password || 'Passwords do not match'
                                            }
                                            : step.validation
                                    )}
                                    className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors[step.field] ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {attemptedStep === active && errors[step.field] && (
                                    <span className='text-red-500 text-xs'>{errors[step.field].message}</span>
                                )}
                            </div>
                        ))}

                        {isError && (
                            <p className='text-red-500 text-sm text-center'>
                                {error?.response?.data?.message || 'Registration failed. Please try again.'}
                            </p>
                        )}

                        {isLastStep ? (
                            <button
                                type='submit'
                                disabled={isPending}
                                className='w-full bg-indigo-500 text-white py-3 rounded-xl font-medium hover:bg-indigo-600 disabled:opacity-50'
                            >
                                {isPending ? 'Creating Account...' : 'Create Account'}
                            </button>
                        ) : (
                            <Button variant="nextAuth" type='button' onClick={handleNext}>
                                Next
                            </Button>
                        )}

                        <div className='flex items-center justify-center gap-3 w-full'>
                            <div className='flex w-[320px] items-center gap-2'>
                                <div className='flex-1 h-px bg-gray-200' />
                                <span className='text-sm text-gray-400'>or</span>
                                <div className='flex-1 h-px bg-gray-200' />
                            </div>
                        </div>

                        <p className='text-center text-sm'>
                            Already have an account?{' '}
                            <button
                                type='button'
                                onClick={() => { handleClose(); onLoginOpen(); }}
                                className='font-bold underline'
                            >
                                Log In
                            </button>
                        </p>

                    </form>
                </div>
            </div>
        </Modal>
    );
}

export default SignupModal;