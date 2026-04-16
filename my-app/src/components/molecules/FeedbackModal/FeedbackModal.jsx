import Modal from "@/components/atoms/Modal/Modal";
import Image from 'next/image'
import {useMutation} from "@tanstack/react-query";
import {reviewCourse} from "@/lib/api";
import useAuthStore from "@/store/useAuthStore";


const FeedbackModal = ({ isOpen, onClose,type,data}) => {
    const {openProfile} = useAuthStore()

    const { mutate: doReview } = useMutation({
        mutationFn: (rating) => reviewCourse(safeData.courseId, rating),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["course", safeData.courseId] });
        },
    });


    const safeData = data || {};
    const FEEDBACK_VARIANTS = {
        enroll: {
            icon: '/Modal_Icons_2.svg',
            title: 'Enrollment Confirmed!',
            courseTitle:`${safeData.courseTitle}`,
            buttonText: 'Start Learning'
        },
        complete: {
            icon: '/Modal_Icons_4.svg',
            title: 'Congratulations!',
            courseTitle:`${safeData.courseTitle}`,
            buttonText: 'View Certificate'
        },
        profile: {
            icon: '/Modal_Icons_1.svg',
            title: 'Complete your profile to continue',
            courseTitle:`You need to complete your profile before enrolling in this course.`,
            buttonText: 'Continue'
        },
        conflict: {
            icon: '/Modal_Icons_3.svg',
            title: 'Enrollment Conflict',
            courseTitle:`${safeData.courseTitle}`,
            buttonText: 'Try Again'
        }
    };

    if (!isOpen || !type) return null;
    const config = FEEDBACK_VARIANTS[type];
    if (!config) return null;

    const formatSchedule = (input) => {
        const dayMap = {
            Monday: "Mon",
            Tuesday: "Tue",
            Wednesday: "Wed",
            Thursday: "Thu",
            Friday: "Fri",
            Saturday: "Sat",
            Sunday: "Sun",
        };

        const [daysPart, timePart] = input.split(" at ");

        const days = daysPart
            .split(" - ")
            .map(d => dayMap[d.trim()])
            .join("-");


        const match = timePart.match(/\((.*?)\)/);
        const range = match ? match[1] : timePart;

        const formatTime = (t) =>
            t
                .replace(/\s/g, "")
                .replace(":00", "")
                .toUpperCase();

        const [start, end] = range.split(" - ").map(formatTime);

        return `${days} at ${start}-${end}`;
    };

     return(
         <Modal isOpen={isOpen} onClose={onClose}>

             {type === 'enroll' && (

                 <div  className='flex flex-col items-center w-[476px] bg-[#FFFFFF] rounded-[16px] gap-[40px] p-[60px]'>

                     <div className='flex flex-col items-center gap-6'>
                         <Image src={config.icon} alt='status' width={94} height={94}/>
                         <div className='flex flex-col items-center gap-6'>
                             <h1 className='font-["Inter"] font-semibold text-[32px] leading-[100%] tracking-normal text-center text-[#3D3D3D]'>{config.title}</h1>
                             <span className='font-["Inter"] font-medium text-[20px] leading-[100%] tracking-normal text-center text-[#3D3D3D]'>You've successfully enrolled to the
                                 <span className='font-["Inter"] font-semibold text-[20px] leading-[24px]'> {config.courseTitle} </span>
                                 Course!
                             </span>
                         </div>
                     </div>


                     <button onClick={onClose} className='font-["Inter"] font-medium text-[16px] cursor-pointer text-[#FFFFFF] leading-[24px] w-full h-[58px] rounded-[8px] px-[25px] py-[17px] bg-[#4F46E5]'>Done</button>


                 </div>

             )}

             {type === 'complete' && (

                 <div  className='flex flex-col items-center w-[476px] bg-[#FFFFFF] rounded-[16px] gap-[40px] p-[60px]'>

                     <div className='flex flex-col items-center gap-6'>
                         <Image src={config.icon} alt='status' width={94} height={94}/>
                         <div className='flex flex-col items-center gap-6'>
                             <h1 className='font-["Inter"] font-semibold text-[32px] leading-[100%] tracking-normal text-center text-[#3D3D3D]'>{config.title}!</h1>
                             <span className='font-["Inter"] font-medium text-[20px] leading-[100%] tracking-normal text-center text-[#3D3D3D]'>
                                 You've completed <span className='font-["Inter"] font-semibold text-[20px] leading-[24px]'>{config.courseTitle}</span> Course!
                             </span>
                         </div>
                     </div>

                     {safeData.isRetaken && (
                     <div className='flex flex-col gap-[18px]'>
                             <div className='relative w-full items-center flex flex-col gap-[18px] rounded-[8px] px-[50px] py-1 bg-white'>
                                 <span className='font-["Inter"]font-medium text-[16px] leading-[24px] tracking-normal text-center text-[#736BEA]'>
                                 Rate your experience
                                 </span>
                                 <div className="flex gap-[18px]">
                                     {[1, 2, 3, 4, 5].map((index) => (
                                         <button
                                             key={index}
                                             onClick={() => {doReview(index);onClose();}}
                                             className="relative cursor-pointer w-[46px] h-[46px]"
                                         >
                                             <img
                                                 src="/emptyStar_vector.svg"
                                                 className="absolute inset-0 w-full h-full object-contain"
                                                 alt="Empty Star"
                                             />
                                         </button>
                                     ))}
                                 </div>
                             </div>
                     </div>
                     )}

                     <button onClick={onClose} className='font-["Inter"] cursor-pointer font-medium text-[16px] text-[#FFFFFF] leading-[24px] w-full h-[58px] rounded-[8px] px-[25px] py-[17px] bg-[#4F46E5]'>Done</button>

                 </div>

             )}

             {type === 'conflict' && (

                 <div  className='flex flex-col items-center w-[476px] bg-[#FFFFFF] rounded-[16px] gap-[40px] p-[60px]'>

                     <div className='flex flex-col items-center gap-6'>
                         <Image src={config.icon} alt='status' width={94} height={94}/>
                         <div className='flex flex-col items-center gap-6'>
                             <h1 className='font-["Inter"] font-semibold text-[32px] leading-[100%] tracking-normal text-center text-[#3D3D3D]'>{config.title}</h1>
                             <span className='font-["Inter"] font-medium text-[20px] leading-[100%] tracking-normal text-center text-[#3D3D3D]'>You are already enrolled in
                                 <span className='font-["Inter"] font-semibold text-[20px] leading-[24px]'> "{config.courseTitle}" </span>
                                 with the same schedule:
                                 <span> {data?.courseDate ? formatSchedule(data.courseDate) : ""} </span>
                             </span>
                         </div>
                     </div>


                     <div className="flex gap-2 w-full">
                         <button
                             onClick={() => {
                                 safeData.handleForceEnroll();
                                 onClose();
                             }}
                             className='font-["Inter"] font-medium text-[16px] hover:bg-[#DDDBFA] hover:border-[#958FEF] transition-all duration-300 cursor-pointer text-[#4F46E5] leading-[24px] h-[58px] w-full rounded-[8px] flex items-center justify-center gap-[2px] pt-[12px] pr-[16px] pb-[12px] pl-[16px] border-2 border-[#958FEF]'
                         >
                             Enroll Anyway
                         </button>
                         <button
                             onClick={onClose}
                             className='font-["Inter"] font-medium text-[16px] cursor-pointer text-[#FFFFFF] leading-[24px] h-[58px] w-full rounded-[8px] px-[25px] py-[17px] bg-[#4F46E5]'
                         >
                             Cancel
                         </button>
                     </div>


                 </div>
             )}

             {type === 'profile' && (

                 <div  className='flex flex-col items-center w-[476px] bg-[#FFFFFF] rounded-[16px] gap-[40px] p-[60px]'>

                     <div className='flex flex-col items-center gap-6'>
                         <Image src={config.icon} alt='status' width={94} height={94}/>
                         <div className='flex flex-col items-center gap-6'>
                             <h1 className='font-["Inter"] font-semibold text-[32px] h-[78px] flex items-center leading-[100%] tracking-normal text-center text-[#3D3D3D]'>{config.title}</h1>
                             <span className='font-["Inter"] flex items-center font-medium text-[20px] h-[48px] leading-[100%] tracking-normal text-center text-[#3D3D3D]'>
                                 {config.courseTitle}
                             </span>
                         </div>
                     </div>

                     <div className="flex gap-2 w-full">
                         <button
                             onClick={() => {
                                 onClose()
                                 openProfile()
                             }}
                             className='font-["Inter"] font-medium hover:bg-[#DDDBFA] hover:border-[#958FEF] transition-all duration-300 text-[16px] cursor-pointer text-[#4F46E5] leading-[24px] h-[58px] w-full rounded-[8px] flex items-center justify-center gap-[2px] pt-[12px] pr-[16px] pb-[12px] pl-[16px] border-2 border-[#958FEF]'
                         >
                             Complete Profile
                         </button>
                         <button
                             onClick={onClose}
                             className='font-["Inter"] font-medium text-[16px] cursor-pointer text-[#FFFFFF] leading-[24px] h-[58px] w-full rounded-[8px] px-[25px] py-[17px] bg-[#4F46E5]'
                         >
                             Cancel
                         </button>
                     </div>




                 </div>
             )}

         </Modal>
     );
};

export default FeedbackModal