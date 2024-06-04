

import { getProductCategoryList } from '@/database/queries'
import Image from 'next/image'
import React, { Fragment } from 'react'

export default async function CategoryList() {
    const categoryList= await getProductCategoryList()
    
    return (
        <div className="container py-16">
            <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">shop by category</h2>
            <div className="grid grid-cols-3 gap-3">
                {
                    categoryList.map(category => (
                        <Fragment key={category?._id}>
                            <div className="relative rounded-sm overflow-hidden group">
                                <Image src={category?.thumbnail} width='200' height='200' alt="category 1" className="w-full" />

                                <a href="#"
                                    className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition">
                                    {category.categoryName}

                                </a>
                            </div>

                        </Fragment>
                    ))
                }

            </div>
        </div>
    )
}
