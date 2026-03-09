import Link from 'next/link';
import React from 'react'

type Props = {
    items: BreadCrumbModel[],
    className: string
}

export default function BreadCrumb({ items, className }: Props) {
    return (<>
        <div className=" w-full bg-slate-400 border-t-2 border border-white">
            <nav className={`container text-md my-auto mx-auto text-gray-600 pt-1 pb-1 ${className ?? ''}`} aria-label="Breadcrumb">
                <ol className="container w-full list-none p-0 inline-flex text-white">
                    {items.map((item, index) => {
                        const isLast = index === items.length - 1;
                        return (
                            <li key={index} className="flex items-center">
                                {!isLast ? (
                                    <>
                                        <Link href={item.url} className="text-blue-600 hover:underline">
                                            {item.pageName}
                                        </Link>
                                        <span className="mx-2">/</span>
                                    </>
                                ) : (
                                    <span className="text-blue-600 font-bold">{item.pageName}</span>
                                )}
                            </li>
                        );
                    })}
                </ol>
            </nav>
        </div>
    </>);
}

