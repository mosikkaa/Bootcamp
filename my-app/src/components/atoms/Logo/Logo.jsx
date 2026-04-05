// components/atoms/Logo/Logo.jsx
import Link from "next/link";


export default function Logo() {
    return (
        <Link href="/" className="">
            <img className="" src="/Logo.svg" alt="Logo" />
        </Link>
    );
}