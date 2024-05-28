import { InputHTMLAttributes } from "react";

interface IStyledInputProps extends InputHTMLAttributes<HTMLInputElement> {
    extraClasses?: string;
}

const StyledInput: React.FC<IStyledInputProps> = ({ disabled = false, extraClasses = '', ...props }) => {
    const classes = `px-4 py-2 text-white ${extraClasses} ${disabled
        ? "bg-gray-600 border-gray-500"
        : "bg-gray-800 border-gray-600 focus:outline focus:outline-blue-500 focus:ring-blue-500 focus:border-blue-500"}`;

    return (
        <input
            className={classes}
            disabled={disabled}
            {...props}
        />
    );
};

export default StyledInput;
