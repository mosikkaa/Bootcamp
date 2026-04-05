
const FooterColumn = ({head,children}) => {
     return(
       <div className='flex flex-col gap-4'>
           <h1>{head}</h1>

           <ul className='flex flex-col gap-2'>
               {children}
           </ul>

       </div>
     );
};

export default FooterColumn