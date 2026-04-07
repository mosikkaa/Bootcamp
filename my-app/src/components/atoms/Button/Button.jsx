
const Button = ({ children, onClick, variant = 'primary' }) => {

    const styles = {
        primary: 'w-[114px] h-[60px] bg-[#4F46E5] rounded-lg gap-0.5 py-3 px-4 text-white',
        outline: 'w-[114px] h-[60px] rounded-lg gap-0.5 py-3 px-4 border-2 border-[#958FEF] text-[blue]',
        browse:'w-[206px] h-[64px] rounded-lg gap-2.5 py-[17px] px-[25px] bg-[#4F46E5] text-white',
        view:'w-[90px] h-[48px] rounded-lg gap-0.5 py-3 px-4 border-2 border-[#958FEF] text-[#4F46E5]',
        progLogin:'font-inter font-medium text-[16px] leading-[24px] tracking-[0%] text-center rounded-lg py-[9px] px-[20px] bg-[#4F46E5] text-white',
        nextAuth:'w-full h-[47px] rounded-[8px] p-[10px] bg-[#4F46E5] text-white',
    };

    return (
        <button onClick={onClick} className={styles[variant]}>
            {children}
        </button>
    );

};

export default Button