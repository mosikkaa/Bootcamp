'use client'

import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import Image from 'next/image'

export default function Modal({ isOpen, onClose, children }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!isOpen) return;

        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!mounted || !isOpen) return null;

    return createPortal(
        <div className='fixed inset-0 z-50 flex items-center justify-center'>
            <div className='absolute inset-0 bg-black/50' onClick={onClose} />
            <div className='relative z-10'>
                <Image src={'/close.svg'} alt={'close'} width={24} height={24} onClick={onClose} className='absolute top-4 right-4 text-gray-400 hover:text-gray-600'/>
                {children}
            </div>
        </div>,
        document.body
    );
}