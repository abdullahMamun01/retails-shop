import BreadCrump from '@/components/BreadCrump'
import React from 'react'

export default function AccountLayout({children}) {
  return (
    <div>
        <BreadCrump/>
        {children}
    </div>
  )
}
