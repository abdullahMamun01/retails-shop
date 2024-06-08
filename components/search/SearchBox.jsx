"use client"

import { useEffect, useState } from 'react'
import SearchSuggestion from './SearchSuggestion'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import useDebounce from '@/hooks/useDebounce'


export default function SearchBox() {
    const [visible, setVisible] = useState(false)
    const pathName = usePathname()
    const { replace } = useRouter()
    const searchParams = useSearchParams()
    const [search, setSearch] = useState("")
    const [suggestions, setSuggestions] = useState(null)
    const [debounceValue,debounceCB] = useDebounce(500)

    
    const doSearch = (e) => {
        e.preventDefault()
        const params = new URLSearchParams(searchParams)
        params.set("search", encodeURI(search))
        const path = pathName.split("/")

        if (path.includes("shop")) {
            replace(`${pathName}?${params.toString()}`)
        } else {
            replace(`${pathName}shop?${params.toString()}`)
        }

    }

    useEffect(() => {
        const getSearchSuggest = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/suggest?query=${debounceValue}`)
            if (!response.ok) {
                throw new Error("failed to fetch")
            }
            const suggest = await response.json()
            console.log({suggest})
            setSuggestions(suggest)
        }

        if(debounceValue){
            getSearchSuggest()
        }

    }, [debounceValue])




    const handleChange = (e) =>{
        setSearch(e.target.value)
        debounceCB(e.target.value)
    }

    return (
        <div className='w-full max-w-xl relative '>

            <div className="w-full max-w-xl relative flex">
                <span className="absolute left-4 top-3 text-lg text-gray-400">
                    <i className="fa-solid fa-magnifying-glass"></i>
                </span>
                <input type="text" name="search" id="search"
                    className="w-full border border-primary border-r-0 pl-12 py-3 pr-3 rounded-l-md focus:outline-none hidden md:flex"
                    placeholder="search"
                    onFocus={() => setVisible(true)}
                    onBlur={() => setVisible(false)}
                    onChange={(e) => handleChange(e)}
                    autoComplete="off" 
                />
                <button
                    onClick={doSearch}
                    className="bg-primary border border-primary text-white px-8 rounded-r-md hover:bg-transparent hover:text-primary transition hidden md:flex">Search</button>
            </div>
            {
                (visible && suggestions) &&
                <div className='absolute w-full mt-1'>
                    <SearchSuggestion suggest={suggestions} />
                </div>
            }
        </div>
    )
}
