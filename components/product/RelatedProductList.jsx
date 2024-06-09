import React from 'react'
import ProductCart from './ProductCart'
import { getRelatedProducts } from '@/database/queries'
import { Carousel } from '../ui/carousel'

export default async function RelatedProductList({ productId, category, tags }) {
    const relatedProductList = await getRelatedProducts(productId, category, tags)

    return (
        <div className="container pb-16">

            {
                relatedProductList.length > 0 && <>
                    <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">Related products</h2>


                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {
                            relatedProductList.map(pd => <ProductCart key={pd.id} product={pd} />)
                        }

                    </div>

                </>

            }
        </div>
    )
}
