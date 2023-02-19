import React from "react";
import { BiX } from "react-icons/bi";

type Props = {
    children: React.ReactNode;
    title: string;
    isOpen: boolean;
    onClose: () => void;
};

function Modal({ children, title, isOpen, onClose }: Props) {
    return isOpen ? (
        <div className="absolute inset-0 flex flex-col justify-center items-center filter backdrop-blur-lg">
            <div className="w-96 p-4 border rounded-lg bg-white">
                <div>
                    <div className="flex justify-between items-center">
                        <h3 className="font-semibold">{title}</h3>
                        <BiX
                            className=" text-error cursor-pointer"
                            size={30}
                            onClick={onClose}
                        />
                    </div>
                    <hr />
                </div>
                <div className="mt-2">{children}</div>
            </div>
        </div>
    ) : null;
}

export default Modal;
