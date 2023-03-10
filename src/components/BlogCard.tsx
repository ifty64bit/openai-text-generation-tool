import React from "react";

type Props = {
    title: string;
    createdAt: string;
    key?: string | number;
};

function BlogCard({ title, createdAt, key }: Props) {
    return (
        <div className="w-80 relative block overflow-hidden rounded-lg border p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

            <div className="sm:flex sm:justify-between sm:gap-4">
                <div>
                    <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                        {title}
                    </h3>
                </div>
            </div>

            {/* <div className="mt-4">
                <p className="max-w-[40ch] text-sm text-gray-500">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. At
                    velit illum provident a, ipsa maiores deleniti consectetur
                    nobis et eaque.
                </p>
            </div> */}

            <dl className="mt-6 flex gap-4 sm:gap-6">
                <div className="flex flex-col-reverse">
                    <dd className="text-xs text-gray-500">{createdAt}</dd>
                </div>
            </dl>
        </div>
    );
}

export default BlogCard;
