'use client'
import Logo from '@/components/atoms/Logo/Logo';
import NavItem from '@/components/molecules/NavItem/NavItem';
import browse_icon from '../../../../public/BrowseIcon.svg'
import enroll_icon from '../../../../public/EnrollIcon.svg'
import AuthButtons from "@/components/molecules/AuthButtons/AuthButtons";
import useAuthStore from "@/store/useAuthStore";
import { useState } from 'react';

const navLinks = [
    { href: '/browse', label: 'Browse Courses', img: browse_icon },
    { label: 'Enroll Courses', img: enroll_icon, isSidebar: true},
];

const Navbar = () => {
    const { isLoggedIn } = useAuthStore();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const visibleLinks = isLoggedIn
        ? navLinks
        : navLinks.filter(link => !link.isSidebar);

    return (
        <header className='w-full flex justify-center items-center relative'>
            <nav className='w-full flex justify-between items-center px-4 sm:px-8 md:px-12 lg:px-16 xl:px-[100px] 2xl:px-[177px] py-[24px] bg-[#F5F5F5] border-[#D1D1D1] shadow-[0px_0px_11.7px_0px_#0000000A] border-b'>

                <Logo />

                <div className='hidden lg:flex items-center gap-9'>
                    <ul className='flex items-center gap-8'>
                        {visibleLinks.map((link, index) => (
                            <li key={index}>
                                <NavItem
                                    href={link.href}
                                    label={link.label}
                                    img={link.img}
                                    isSidebar={link.isSidebar}
                                />
                            </li>
                        ))}
                    </ul>
                    <AuthButtons />
                </div>

                <button
                    className='lg:hidden flex flex-col justify-center items-center gap-[5px] w-10 h-10 cursor-pointer'
                    onClick={() => setIsMenuOpen(prev => !prev)}
                    aria-label='Toggle menu'
                >
                    <span className={`block w-6 h-[2px] bg-[#0A0A0A] transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
                    <span className={`block w-6 h-[2px] bg-[#0A0A0A] transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
                    <span className={`block w-6 h-[2px] bg-[#0A0A0A] transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
                </button>

            </nav>

            {isMenuOpen && (
                <div className='lg:hidden absolute top-full left-0 w-full bg-[#F5F5F5] border-b border-[#D1D1D1] shadow-[0px_4px_11.7px_0px_#0000000A] z-50 flex flex-col px-4 sm:px-8 py-4 gap-4'>
                    <ul className='flex flex-col gap-3'>
                        {visibleLinks.map((link, index) => (
                            <li key={index} onClick={() => setIsMenuOpen(false)}>
                                <NavItem
                                    href={link.href}
                                    label={link.label}
                                    img={link.img}
                                    isSidebar={link.isSidebar}
                                />
                            </li>
                        ))}
                    </ul>
                    <div className='pt-2 border-t border-[#D1D1D1]'>
                        <AuthButtons />
                    </div>
                </div>
            )}
        </header>
    );
}

export default Navbar;