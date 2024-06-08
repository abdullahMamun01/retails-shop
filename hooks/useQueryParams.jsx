import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { useEffect, useState } from 'react'

export default function useQueryParams(queryName) {

    const [query, setQuery] = useState([])

    const searchParams = useSearchParams()
    const pathName = usePathname()
    const { replace } = useRouter()
    const params = new URLSearchParams(searchParams)

    useEffect(() => {

        if (query.length > 0) {
            const selectCategory = query.join("|")
            console.log({ selectCategory })
            params.set(queryName, encodeURI(selectCategory))

        } else {
            params.delete(queryName)
        }
        // if()
        replace(`${pathName}?${params.toString()}`)

    }, [query])


    useEffect(() => {
        const params = new URLSearchParams(searchParams)

        const getField = params.get(queryName)
        if (getField) {
            const decode = decodeURI(getField).split("|")
            setQuery(decode)

        }
    }, [])



    return {
        query,
        setQuery
    }
}
