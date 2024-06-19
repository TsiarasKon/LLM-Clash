import { SelectHTMLAttributes } from "react";

interface IStyledSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    extraClasses?: string;
    options: { value: string | number, text: string }[];
}

const StyledSelect: React.FC<IStyledSelectProps> = ({ options, disabled = false, extraClasses = '', ...props }) => {
    const classes = `min-w-max text-white text-sm block w-full p-3 ${extraClasses} ${disabled
        ? "bg-gray-600 border-gray-500"
        : "bg-gray-800 border-gray-600 cursor-pointer"}`;
    
    return (
        <select className={classes} disabled={disabled} {...props}>
            {options.map(el => <option value={el.value} key={el.value}>{el.text}</option>)}
        </select>
    );
};

export default StyledSelect;
