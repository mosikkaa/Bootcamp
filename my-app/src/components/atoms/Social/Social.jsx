import Link from "next/link";
import Image from "next/image";
import facebook from "../../../../public/Facebook.svg";

const Items = [
    {href: 'facebook.com',label:'facebook', img:facebook},
    {href: 'facebook.com',label:'facebook', img:facebook},
    {href: 'facebook.com',label:'facebook', img:facebook},
    {href: 'facebook.com',label:'facebook', img:facebook},
    {href: 'facebook.com',label:'facebook', img:facebook},
    {href: 'facebook.com',label:'facebook', img:facebook}
]

const Social = () => {
     return(
         <div>
             <ul className="flex -m-[11px]">
                 {Items.map((item, index) => (
                     <li className='' key={index}>
                         <Link className='block p-[11px]' href={item.href}>
                             <Image src={item.img} alt={item.label} width={11} height={19}/>
                         </Link>
                     </li>
                 ))}

             </ul>
         </div>
     );
};

export default Social