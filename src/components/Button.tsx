import React from "react";
import { TailSpin } from "react-loader-spinner";

type Props = {
    children: React.ReactNode;
    type?: "button" | "submit" | "reset";
    variant?: "primary" | "secondary";
    size?: "small" | "medium" | "large";
    disabled?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
    isLoading?: boolean;
};

function Button({
    children,
    type,
    variant,
    size,
    disabled,
    onClick,
    className,
    isLoading,
}: Props) {
    return (
        <button
            className={`bg-primary hover:bg-primary-light text-white flex gap-1 items-center font-bold py-2 px-4 rounded hover:shadow-lg transition-all duration-300 ${className}`}
            type={type}
            disabled={disabled}
            onClick={onClick}
        >
            <TailSpin
                height="20"
                width="20"
                color="#ffffff"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={isLoading}
            />
            {children}
        </button>
    );
}

Button.defaultProps = {
    type: "button",
    variant: "primary",
    size: "medium",
    disabled: false,
    isLoading: false,
    className: "",
    onclick: () => false,
    children: <p>Button</p>,
};

export default Button;
