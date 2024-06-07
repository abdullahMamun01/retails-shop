"use client"
import { usePathname } from 'next/navigation'
import React from 'react'
import { FacebookIcon, FacebookShareButton, LinkedinIcon, LinkedinShareButton, TwitterIcon, TwitterShareButton } from 'react-share'
export default function SocialList() {
    const pathName = usePathname()
    const shareUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${pathName}`
    return (

        <div className="flex gap-3 mt-4">

            <FacebookShareButton url={shareUrl}>
                <FacebookIcon size={28} round={50} />
            </FacebookShareButton>


            <TwitterShareButton url={shareUrl}>
                <TwitterIcon size={28} round={50} />
            </TwitterShareButton>


            <LinkedinShareButton url={shareUrl}>
                <LinkedinIcon size={28} round={50} />
            </LinkedinShareButton>

        </div>

    )
}
