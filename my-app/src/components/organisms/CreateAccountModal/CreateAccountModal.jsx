import Modal from '@/components/atoms/Modal/Modal';
import Button from '@/components/atoms/Button/Button';

export default function CreateAccountModal({ isOpen, onClose, onLoginOpen }) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2 className='text-xl font-bold text-center mb-1'>Create Account</h2>
            <p className='text-sm text-gray-500 text-center mb-6'>Join and start learning today</p>

            <div className='flex flex-col gap-4'>
                <div>
                    <label className='text-sm font-medium'>Email *</label>
                    <input
                        type='email'
                        placeholder='you@example.com'
                        className='w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500'
                    />
                </div>

                <Button variant='primary' className='w-full'>Next</Button>

                <p className='text-center text-sm text-gray-500'>
                    Already have an account?{' '}
                    <button onClick={() => { onClose(); onLoginOpen(); }} className='text-indigo-600 underline'>
                        Log in
                    </button>
                </p>
            </div>
        </Modal>
    );
}