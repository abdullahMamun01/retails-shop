import React from 'react'
import CategoriesFilterAction from './filterAction/CategoriesFilterAction'
import PriceFilterAction from './filterAction/PriceFilterAction'
import SizeByFilterAction from './filterAction/SizeByFilterAction'
import { extractUniqueCategoryList } from '@/utils'
import { getProductCategoryList } from '@/database/queries'

export default async  function Sidebar() {
    const categories = await getProductCategoryList()
    return (

        <div className="divide-y divide-gray-200 space-y-5">

            <CategoriesFilterAction categories={categories} />
            <PriceFilterAction />
            <SizeByFilterAction />
        </div>


    )
}
