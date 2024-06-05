'use client'
import Image from 'next/image';
import React, { useState } from 'react';

const ProductImageGallery = ({ images , thumbnail,name}) => {
    const [selectImage,setSelectImage] = useState(thumbnail || "")
    const handleSelect = (image) => {
        setSelectImage(image)
    }
    return (

        <div>
            <Image src={selectImage} width='300' height='300' alt={name || ""} className="w-full h-[400px]" />
            <div className="grid grid-cols-5 gap-4 mt-4">
                {
                    images.map((img, i) => (

                    <button key={i} onClick={() => handleSelect(img)} className='cursor-pointer'>
                        <Image  src={img} width='300' height='300' alt="product" className="w-full h-[100px] border-1 border-green-300" />
                    </button>
                
                ))
                }



            </div>
        </div>

    );
};

export default ProductImageGallery;
