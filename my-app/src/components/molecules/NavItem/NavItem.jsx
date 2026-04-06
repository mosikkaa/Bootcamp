'use client'

import Link from 'next/link';
import Image from 'next/image';
import useAuthStore from '@/store/useAuthStore';

const NavItem = ({ href, label, img, isSidebar }) => {
    const { openSidebar } = useAuthStore();

    if (isSidebar) {
        return (
            <button onClick={openSidebar} className='flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium transition-colors'>
                {img && <Image src={img} alt={label} width={20} height={20} className='w-[20px] h-[20px]' />}
                {label}
            </button>
        );
    }

    return (
        <Link href={href} className='flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium transition-colors'>
            {img && <Image src={img} alt={label} width={20} height={20} className='w-[20px] h-[20px]' />}
            {label}
        </Link>
    );
}

export default NavItem;