import Modal from "@/components/atoms/Modal/Modal";
import Image from 'next/image'

const FeedbackModal = ({ isOpen, onClose }) => {
     return(
         <Modal isOpen={isOpen} onClose={onClose}>
             <div  className='flex flex-col w-[476px] bg-[#FFFFFF] rounded-[16px] gap-[40px] p-[60px]'>


                 <div className='flex flex-col gap-6'>
                     <Image src={'/Modal_Icons_1.svg'} alt='status' width={94} height={94}/>
                 </div>


                 <div></div>


             </div>
         </Modal>
     );
};

export default FeedbackModal