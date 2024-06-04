import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import React from 'react'

export default function EditBtn({children}) {
    return (
        <Dialog>
            <DialogTrigger className="text-red-500">Edit</DialogTrigger>
            <DialogContent>
               {children}
            </DialogContent>
        </Dialog>
    )
}
