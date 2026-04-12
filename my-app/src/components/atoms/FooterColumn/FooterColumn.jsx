
const FooterColumn = ({head,children}) => {
     return(
       <div className='flex flex-col gap-4'>
           <h1 className='font-["Inter"] font-semibold text-[20px] leading-[24px] tracking-normal text-[#130E67]'>{head}</h1>

           <ul className='flex flex-col gap-2'>
               {children}
           </ul>

       </div>
     );
};

export default FooterColumn