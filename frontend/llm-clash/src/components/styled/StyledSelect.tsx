import { SelectHTMLAttributes } from "react";

interface IStyledSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    extraClasses?: string;
    options: { value: string | number, text: string }[];
    defaultValue?: string;
}

const StyledSelect: React.FC<IStyledSelectProps> = ({ options, disabled = false, extraClasses = '', defaultValue, ...props }) => {
    const classes = `min-w-max text-white text-sm block w-full p-3 ${extraClasses} ${disabled
        ? "bg-gray-600 border-gray-500"
        : "bg-gray-800 border-gray-600 cursor-pointer focus:outline focus:outline-blue-500 focus:ring-blue-500 focus:border-blue-500"}`;
    
    return (
        <select defaultValue={defaultValue ?? options[0].value} className={classes} disabled={disabled} {...props}>
            {options.map(el => <option value={el.value} key={el.value}>{el.text}</option>)}
        </select>
    );
};

export default StyledSelect;
