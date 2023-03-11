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
            className={`group rounded relative inline-block overflow-hidden border border-indigo-600 px-8 py-3 focus:outline-none focus:ring ${className}`}
            type={type}
            disabled={disabled}
            onClick={onClick}
        >
            <span className="absolute inset-y-0 left-0 w-[2px] bg-indigo-600 transition-all group-hover:w-full group-active:bg-indigo-500" />
            <span className="relative text-sm font-medium text-indigo-600 transition-colors group-hover:text-white flex gap-2 items-center justify-center">
                {children}{" "}
                <TailSpin
                    height="20"
                    width="20"
                    color="gray"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={isLoading}
                />
            </span>
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
