import React from "react";
import ImageWithFallBack from "./components/ImageWithFallBack";

export interface IProductImageGallery {
    listImage: string[];
}
export function ProductImageGarelly({listImage} : IProductImageGallery)  {
    return (
        <>
        <div className="flex flex-grow justify-center bg-[#f0f0f0]   gap-5 mt-5">
            {listImage.map((item,index) => (
                <ImageWithFallBack
                key={index}
                className="w-[100px] h-[100px] object-cover border-2 p-1" 
                style={{ imageRendering: "crisp-edges" }} 
                width={100} 
                height={100} 
                src={item} 
                alt="photo"  />
            ))}
        </div>
        </>
    )
}
