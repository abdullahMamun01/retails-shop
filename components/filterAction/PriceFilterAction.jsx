'use client'

import useQueryParams from "@/hooks/useQueryParams"

export default function PriceFilterAction() {
    const {query: min , setQuery: setMin} = useQueryParams('min')
    const {query: max , setQuery: setMax} = useQueryParams('max')

    const handleMinPrice = (e) => {
        if(e.target.value === ''){
           return
        }else{
            setMin([e.target.value])

        }

    }

    const handleMaxPrice = (e) => {
        if(e.target.value == ''){
            setMax([])
        }else{
            setMax([e.target.value])

        }

    }

     return (
        <div className="pt-4">
            <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">Price</h3>
            <div className="mt-4 flex items-center">
                <input type="text" name="min" id="min"
                    className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
                    placeholder="min" 
                    onChange={ handleMinPrice}
                    value={min}
                    
                    />
                <span className="mx-3 text-gray-500">-</span>
                <input type="text" name="max" id="max"
                    className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
                    placeholder="max" 
                    value={max}
                    onChange={handleMaxPrice}
                    
                    />
            </div>
        </div>
    )
}
