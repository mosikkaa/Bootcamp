
const Button = ({ children, onClick, variant = 'primary' }) => {

    const styles = {
        primary: 'w-[114px] h-[60px] bg-[#4F46E5] rounded-lg gap-0.5 py-3 px-4 text-white',
        outline: 'w-[114px] h-[60px] rounded-lg gap-0.5 py-3 px-4 border-2 border-[#958FEF] text-[blue]',
        browse:'w-[206px] h-[64px] rounded-lg gap-2.5 py-[17px] px-[25px] bg-[#4F46E5] text-white',
        view:'w-[90px] h-[48px] rounded-lg gap-0.5 py-3 px-4 border-2 border-[#958FEF] text-[#4F46E5]',
        progLogin:'w-[83px] h-[42px] text-center rounded-lg gap-[10px] py-[17px] px-[25px] bg-[#4F46E5] text-white'
    };

    return (
        <button onClick={onClick} className={styles[variant]}>
            {children}
        </button>
    );

};

export default Button