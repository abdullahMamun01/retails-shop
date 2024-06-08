import BreadCrump from '@/components/BreadCrump'
import React from 'react'

export default function ProductLayout({children}) {
  return (
    <div>
      <BreadCrump />
        {children}
    </div>
  )
}
