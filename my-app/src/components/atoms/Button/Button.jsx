
const Button = ({ children, onClick, variant }) => {

    const styles = {
        primary: 'w-[114px] h-[60px] bg-[#4F46E5] rounded-lg gap-0.5 py-3 px-4 text-white cursor-pointer',
        featured: 'rounded-[8px] py-[19px] px-[25.4px] bg-[#4F46E5] font-["Inter"] font-medium text-[20px] leading-none tracking-normal text-center text-white cursor-pointer',
        outline: 'w-[114px] h-[60px] rounded-lg gap-0.5 py-3 px-4 border-2 border-[#958FEF] text-[blue] cursor-pointer',
        browse:'w-[206px] h-[64px] rounded-lg gap-2.5 py-[17px] px-[25px] bg-[#4F46E5] text-white cursor-pointer',
        view:'w-[90px] h-[48px] rounded-lg hover:bg-[#281ED2] hover:text-white cursor-pointer duration-400 ease-in-out transition-all hover:border-transparent  gap-0.5 py-3 px-4 border-2 border-[#958FEF] text-[#4F46E5]',
        viewV2:'w-[117px] h-[48px] rounded-lg gap-0.5 hover:bg-[#281ED2] hover:text-white py-3 px-4 border-2 duration-400 ease-in-out transition-all border-[#958FEF] text-[#4F46E5] cursor-pointer',
        progLogin:'font-inter font-medium text-[16px] leading-[24px] tracking-[0%] text-center rounded-lg py-[9px] px-[19.3px] bg-[#4F46E5] text-white cursor-pointer',
        nextAuth:'font-["Inter"] font-medium text-base leading-6 tracking-normal text-center text-white w-full h-[47px] rounded-[8px] p-[10px] bg-[#4F46E5] text-white cursor-pointer',
        enrolled:'rounded-[100px] p-4 bg-[#736BEA1A] font-["Inter"] font-semibold text-[20px] leading-[24px] tracking-normal text-[#736BEA] cursor-pointer',
        completed:'bg-[#1DC31D1A] rounded-[100px] p-4 text-[#1DC31D] font-["Inter"] font-semibold text-[20px] leading-[24px] tracking-normal cursor-pointer',
        categories:'group flex items-center h-[39px] rounded-[12px] px-[12px] py-[8px] gap-[10px] border border-transparent bg-[#FFFFFF] transition-all duration-300 ease-out hover:text-[#281ED2] hover:bg-[#DDDBFA] cursor-pointer',
        categoriesActive: 'group flex items-center  h-[39px] rounded-[12px] px-[12px] py-[8px] gap-[10px] bg-[#EEEDFC] transition-all duration-300 text-[#281ED2] border border-[#281ED2] cursor-pointer',
        instructors:'group border border-transparent flex items-center rounded-[12px] px-[12px] py-[8px] gap-[10px] bg-[#FFFFFF] transition-all duration-300 ease-out hover:text-[#281ED2] hover:bg-[#DDDBFA] cursor-pointer',
        instructorsActive:'group border flex items-center rounded-[12px] px-[12px] py-[8px] gap-[10px] bg-[#EEEDFC] text-[#281ED2] border border-[#281ED2] cursor-pointer',
        browseCard:'flex items-center h-[39px] rounded-[12px] px-[12px] py-[8px] gap-[6px] bg-[#F5F5F5] cursor-pointer'
    };

    return (
        <button onClick={onClick} className={styles[variant]}>
            {children}
        </button>
    );

};

export default Button