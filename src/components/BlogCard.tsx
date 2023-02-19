import React from "react";

type Props = {
    title: string;
    createdAt: string;
    key?: string | number;
};

function BlogCard({ title, createdAt, key }: Props) {
    return (
        <div
            key={key}
            className="w-44 h-24 bg-white border p-2 space-y-2 rounded-lg shadow-lg cursor-pointer hover:shadow-xl"
        >
            <h3 className="font-semibold">{title}</h3>
            <hr />
            <p>{createdAt}</p>
        </div>
    );
}

export default BlogCard;
