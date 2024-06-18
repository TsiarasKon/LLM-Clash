import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";

interface IStyledLinkProps extends LinkProps {
    children: ReactNode;
    disabled?: boolean;
    extraClasses?: string;
}

const StyledLink: React.FC<IStyledLinkProps> = ({ children, disabled = false, extraClasses = '', ...props }) => {
    const classes = `block max-w-sm mx-5 mt-5 p-6 border rounded-lg shadow bg-gray-800 border-gray-700 ${extraClasses} ${disabled
        ? "opacity-50 cursor-default"
        : "hover:bg-gray-700"}`;

    return (
        <Link
            className={classes}
            {...props}
        >
            {children}
        </Link>
    );
};

export default StyledLink;
