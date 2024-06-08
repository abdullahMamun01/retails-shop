'use client'


import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { usePathname } from "next/navigation"
import { CopyIcon, Share2Icon } from "lucide-react"
import SocialList from "./SocialList"
export default function SocialShare() {
    const pathName = usePathname()
    const shareUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${pathName}`
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="my-4 border-0">

                    <Share2Icon className='text-gray-600 hover:text-sky-600 cursor-pointer' />

                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Social Share </DialogTitle>
                    <DialogDescription>
                        Anyone who has this link will be able to view this.
                        <div className="my-4 ">
                            <SocialList />
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="link" className="sr-only">
                            Link
                        </Label>
                        <Input
                            id="link"
                            defaultValue={shareUrl}
                            readOnly
                        />
                    </div>
                    <Button type="submit" size="sm" className="px-3">
                        <span className="sr-only">Copy</span>
                        <CopyIcon className="h-4 w-4" />
                    </Button>
                </div>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
