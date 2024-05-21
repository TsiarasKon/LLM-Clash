import { ButtonHTMLAttributes } from "react";

interface IStyledInputProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    extraClasses?: string;
}

const StyledButton: React.FC<IStyledInputProps> = ({ children, disabled, extraClasses = '', ...props }) => {
    const classes = `ml-2 px-3 py-2 text-white rounded-lg ${extraClasses} ${disabled
        ? "opacity-50 bg-gray-700 cursor-not-allowed"
        : "bg-gray-700 focus:outline-none hover:bg-gray-600"}`;

    return (
        <button
            className={classes}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};

export default StyledButton;
