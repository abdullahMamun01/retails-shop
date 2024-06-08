
import React from 'react'
import { Card } from '../ui/card'
import {
    Command,
    CommandGroup,
    CommandItem,
    CommandList,

} from "@/components/ui/command"
import Link from 'next/link'

export default function SearchSuggestion({ suggest }) {

    return (
        <Card>
            <Command>

                <CommandList>
                    <CommandGroup heading="Suggestions" className="hover:text-sky-600">

                        {
                            suggest?.map(({ _id, name }) =>
                                <CommandItem key={_id} className="py-2">
                                    <Link href={`/product/${_id}`} className='w-full h-full block'>
                                        {name}
                                    </Link>
                                </CommandItem>
                            )
                        }

                    </CommandGroup>
                </CommandList>
            </Command>
        </Card>
    )
}
