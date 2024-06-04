import React from 'react'
import ProductCart from '../product/ProductCart'
import { getTopNewArrivals } from '@/database/queries'

export default async function TopNewArrivals() {
  const newArrival = await getTopNewArrivals()
  
  return (
    <div className="container pb-16">
      <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">top new arrival</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
     
        {
          newArrival?.map(pd => (
            <ProductCart key={pd.id} product={pd} />
          ))
        }
      </div>
    </div>
  )
}
