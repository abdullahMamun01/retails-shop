import React from 'react'
import Logo from './Logo'


import UserAction from './UserAction'
import SearchBox from '@/components/search/SearchBox'


export default function Headers() {
    return (
        <header className="py-4 shadow-sm bg-white w-full">
            <div className="container flex items-center justify-between">
                <Logo/>
                <SearchBox/>
                <UserAction/>
            </div>
            <div className='my-5'></div>
 
        </header>
    )
}
