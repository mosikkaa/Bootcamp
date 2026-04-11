
const Button = ({ children, onClick, variant }) => {

    const styles = {
        primary: 'w-[114px] h-[60px] bg-[#4F46E5] rounded-lg gap-0.5 py-3 px-4 text-white',
        featured: 'rounded-[8px] py-[19px] px-[25.4px] bg-[#4F46E5] font-["Inter"] font-medium text-[20px] leading-none tracking-normal text-center text-white',
        outline: 'w-[114px] h-[60px] rounded-lg gap-0.5 py-3 px-4 border-2 border-[#958FEF] text-[blue]',
        browse:'w-[206px] h-[64px] rounded-lg gap-2.5 py-[17px] px-[25px] bg-[#4F46E5] text-white',
        view:'w-[90px] h-[48px] rounded-lg gap-0.5 py-3 px-4 border-2 border-[#958FEF] text-[#4F46E5]',
        viewV2:'w-[117px] h-[48px] rounded-lg gap-0.5 py-3 px-4 border-2 border-[#958FEF] text-[#4F46E5]',
        progLogin:'font-inter font-medium text-[16px] leading-[24px] tracking-[0%] text-center rounded-lg py-[9px] px-[19.3px] bg-[#4F46E5] text-white',
        nextAuth:'w-full h-[47px] rounded-[8px] p-[10px] bg-[#4F46E5] text-white',
        categories:'group flex items-center h-[39px] rounded-[12px] px-[12px] py-[8px] gap-[10px] bg-[#FFFFFF] transition duration-300 ease-out hover:text-[#281ED2] hover:bg-[#DDDBFA]',
        categoriesActive: 'group flex items-center h-[39px] rounded-[12px] px-[12px] py-[8px] gap-[10px] bg-[#EEEDFC] text-[#281ED2] border border-[#281ED2]',
        instructors:'group flex items-center rounded-[12px] px-[12px] py-[8px] gap-[10px] bg-[#FFFFFF] transition duration-300 ease-out hover:text-[#281ED2] hover:bg-[#DDDBFA]',
        instructorsActive:'group flex items-center rounded-[12px] px-[12px] py-[8px] gap-[10px] bg-[#EEEDFC] text-[#281ED2] border border-[#281ED2]',
        browseCard:'flex items-center h-[39px] rounded-[12px] px-[12px] py-[8px] gap-[6px] bg-[#F5F5F5]'
    };

    return (
        <button onClick={onClick} className={styles[variant]}>
            {children}
        </button>
    );

};

export default Button