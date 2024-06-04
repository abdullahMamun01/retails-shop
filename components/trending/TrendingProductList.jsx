import React from 'react'
import ProductCart from '../product/ProductCart'
import { getTrendingProducts } from '@/database/queries'

export default async function TrendingProductList() {
  const trendingProduct = await getTrendingProducts()

  return (
    <div className='container pb-16'>
        <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">TRENDING PRODUCTS</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          
          {trendingProduct?.map(pd => (
            <ProductCart key={pd.id} product={pd} />
          ))}
        </div>
    </div>
  )
}
