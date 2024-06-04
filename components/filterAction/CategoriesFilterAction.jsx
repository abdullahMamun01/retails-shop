'use client'


import useQueryParams from '@/hooks/useQueryParams'
import React, { useEffect, useState } from 'react'

export default function CategoriesFilterAction({ categories }) {
  
    const {query ,setQuery} = useQueryParams('category')
    const handleCategorySelect = (e) => {

        const name = e.target.name
        const checked = e.target.checked
        if (checked) {

            setQuery(prev => [...prev, e.target.name])

        } else {
            setQuery(query.filter(category => category != name))
        }
    }

  




    return (
        <div>
            <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">Categories</h3>
            <div className="space-y-2">
                {
                    categories?.map((category) =>
                        <div key={category?._id} className="flex items-center">
                            <input onChange={handleCategorySelect} type="checkbox" name={category?.categoryName} id="cat-1"
                                className="text-primary focus:ring-0 rounded-sm cursor-pointer"
                                checked={query.includes(category.categoryName)}

                            />
                            <label htmlFor="cat-1" className="text-gray-600 ml-3 cusror-pointer">{category.categoryName}</label>
                            <div className="ml-auto text-gray-600 text-sm">({category.count})</div>
                        </div>
                    )
                }

            </div>
        </div>
    )
}
