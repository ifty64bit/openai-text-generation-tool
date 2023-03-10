import React from "react";
import { BiPlus } from "react-icons/bi";

type Props = {
    onClick: () => void;
};

function CreateNewButton({ onClick }: Props) {
    return (
        <button
            className="w-80 min-h-max bg-white border p-2 flex flex-col justify-center items-center rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            onClick={onClick}
        >
            <BiPlus size={40} />
            Create New
        </button>
    );
}

export default CreateNewButton;
