import Link from "next/link";
import Image from "next/image";
import facebook from "../../../../public/Facebook.svg";
import twitter from "../../../../public/twitter.svg"
import instagram from "../../../../public/Instagram.svg"
import linkedin from "../../../../public/LinkedIn.svg"
import youtube from "../../../../public/YouTube.svg"

const Items = [
    {href: 'facebook.com',label:'facebook', img:facebook,width:11,height:19},
    {href: 'x.com',label:'twitter', img:twitter,width:19,height:15},
    {href: 'instagram.com',label:'instagram', img:instagram,width:19,height:19},
    {href: 'linkedin.com',label:'linkedin', img:linkedin,width:19,height:18},
    {href: 'youtube.com',label:'youtube', img:youtube,width:21,height:15},
]

const Social = () => {
     return(
         <div>
             <ul className="flex items-center -m-[11px]">
                 {Items.map((item, index) => (
                     <li className='' key={index}>
                         <Link className='block p-[11px]' href={item.href}>
                             <Image src={item.img} alt={item.label} width={item.width} height={item.height}/>
                         </Link>
                     </li>
                 ))}

             </ul>
         </div>
     );
};

export default Social