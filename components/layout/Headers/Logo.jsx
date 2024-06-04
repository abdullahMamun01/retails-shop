import Image from 'next/image'
import React from 'react'

export default function Logo() {
  return (
    <Image src="/images/logo.svg" width='32' height='32'  alt="Logo" className="w-32 " />
  )
}
