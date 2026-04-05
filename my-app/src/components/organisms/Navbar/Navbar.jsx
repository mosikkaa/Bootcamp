import Logo from '@/components/atoms/Logo/Logo';
import NavItem from '@/components/molecules/NavItem/NavItem';
import browse_icon from '../../../../public/BrowseIcon.svg'
import AuthButtons from "@/components/molecules/AuthButtons/AuthButtons";

const navLinks = [
    { href: '/courses', label: 'Browse Courses',img:browse_icon},
];

export default function Navbar() {
    return (
        <header className='w-full flex justify-center items-center'>
            <nav className='w-full flex justify-between items-center px-[177px]! py-[24px]! bg-[#F5F5F5]  border-[#D1D1D1] shadow-[0px_0px_11.7px_0px_#0000000A] border-b'>

                <Logo />

                <div className='flex items-center gap-9'>
                    <ul className='flex items-center gap-8'>
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <NavItem href={link.href} label={link.label} img={link.img}/>
                            </li>
                        ))}
                    </ul>
                    <AuthButtons />
                </div>

            </nav>
        </header>
    );
}