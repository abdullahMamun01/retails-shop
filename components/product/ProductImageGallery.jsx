import Image from 'next/image';
import React from 'react';

const ProductImageGallery = ({ images }) => {
    return (
        <div className="grid grid-cols-5 gap-4 mt-4">
            {
                images.map((img ,i) =>( <Image key={i} src={img} width='300' height='300' alt="product" className="w-full h-[100px] border-1 border-green-300" />))
            }
           
           

        </div>
                            
);
};

                            export default ProductImageGallery;
