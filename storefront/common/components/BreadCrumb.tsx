import Link from 'next/link';
import React from 'react'

type Props = {
    items: BreadCrumbModel[],
    className: string
}

export default function BreadCrumb({ items, className }: Props) {
    return (
        <>
            <div className="w-full border-y bg-slate-100/80">
                <nav
                    className={`container mx-auto flex items-center py-2 text-sm text-slate-600 ${className ?? ''}`}
                    aria-label="Breadcrumb"
                >
                    <ol className="flex flex-wrap items-center gap-1">
                        {items.map((item, index) => {
                            const isLast = index === items.length - 1;
                            return (
                                <li key={index} className="flex items-center">
                                    {!isLast ? (
                                        <>
                                            <Link
                                                href={item.url}
                                                className="transition-colors hover:text-slate-900"
                                            >
                                                {item.pageName}
                                            </Link>
                                            <span className="mx-2 text-slate-400">/</span>
                                        </>
                                    ) : (
                                        <span className="font-semibold text-slate-900">
                                            {item.pageName}
                                        </span>
                                    )}
                                </li>
                            );
                        })}
                    </ol>
                </nav>
            </div>
        </>
    );
}

