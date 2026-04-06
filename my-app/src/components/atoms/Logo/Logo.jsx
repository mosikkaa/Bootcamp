// components/atoms/Logo/Logo.jsx
import Link from "next/link";


const Logo = () => {
    return (
        <Link href="/" className="">
            <img className="" src="/Logo.svg" alt="Logo" />
        </Link>
    );
}

export default Logo;