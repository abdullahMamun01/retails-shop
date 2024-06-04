import Image from 'next/image'
import React from 'react'

export default function Advertisement() {
  return (

    <div className="container pb-16">
        <a href="#">
            <Image src="/images/offer.jpg" alt="ads" width='2000' height='2000' className="w-full" />
        </a>
    </div>

  )
}
