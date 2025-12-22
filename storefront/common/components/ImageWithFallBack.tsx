import React, { useEffect, useState } from 'react'
import clsx from 'clsx';

type Props = {
    src: string;
    alt: string;
    width?: number | string;
    height?: number | string;
    className?: string;
    fallback?: string;
    style?: React.CSSProperties;
}

const ImageWithFallBack = ({
    width = 500,
    height = 500,
    src,
    alt,
    className,
    style,
    fallback: customFallBack = '/static/images/default-fallback-image.jpg', ...props }: Props) => {
    
    const [fallBack, setFallBack] = useState<string | null>(null);
    const [srcImg, setSrcImg] = useState<string>(src);

    useEffect(() => {
        setFallBack(null);
        setSrcImg(src);
    }, [src]);
    return (
        <>
            <img
                width={width}
                height={height}
                style={style}
                className={clsx(className)}
                alt={alt}
                src={fallBack || srcImg}
                {...props}
                onError={(event) => {
                    event.currentTarget.onerror = null;
                    setFallBack(customFallBack)
                }}>
            </img>
        </>
    )
}

export default ImageWithFallBack