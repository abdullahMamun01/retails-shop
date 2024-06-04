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
                    <CommandGroup  heading="Suggestions" className="hover:text-sky-600">

                        {
                            suggest?.map(({ _id, name }) => <CommandItem key={_id}>
                                <Link href={`/en/product/${_id}`}>
                                    {name}
                                </Link>

                            </CommandItem>)
                        }

                    </CommandGroup>
                </CommandList>
            </Command>
        </Card>
    )
}
