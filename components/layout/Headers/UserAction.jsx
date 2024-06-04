
import ShoppingCart from '@/components/ui/ShoppingCart'
import { User } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import WishlistIcon from './WishlistIcon'

export default function UserAction() {
  return (
    <div className="flex items-center space-x-4">
      <Link href="/wishlist" className="text-center text-gray-700 hover:text-primary transition relative">
        <WishlistIcon/>
      </Link>
      <Link href="/cart" className="text-center text-gray-700 hover:text-primary transition relative">
        <ShoppingCart/>
      </Link>
      <Link href="/" className="text-center text-gray-700 hover:text-primary transition relative">
        <div className="text-2xl">
          <User/>
        </div>
        <div className="text-xs leading-3">Account</div>
      </Link>
    </div>
  )
}
