// components/molecules/NavItem/NavItem.jsx
import Link from "next/link";
import Image from "next/image";

export default function NavItem({ href, label,img}) {
    return (
        <Link href={href} className='flex gap-2 text-[#525252] p-[15px]! font-inter font-medium text-[20px] items-center'>
            {img && <Image src={img} alt={label} width={26} height={26} />}
            {label}
        </Link>
    );
}