import { ButtonHTMLAttributes } from "react";

interface IStyledButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    color?: "gray" | "darkred";
    extraClasses?: string;
}

const colorPair = {
    "gray": ["bg-gray-700", "bg-gray-600"],
    "darkred": ["bg-red-900", "bg-red-800"]
}

const StyledButton: React.FC<IStyledButtonProps> = ({ children, disabled = false, color='gray', extraClasses = '', ...props }) => {
    const classes = `ml-2 px-3 py-2 text-white rounded-lg ${colorPair[color][0]} ${extraClasses} ${disabled
        ? "opacity-50"
        : `focus:outline-none hover:${colorPair[color][1]}`}`;

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
