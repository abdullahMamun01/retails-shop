import React from 'react'
import { CartProvider } from './CartProvider'
import { WishlistProvider } from './wishlistProvider'
import AuthProvider from './AuthProvider'


export default function Provider({ children }) {
  return (
    <AuthProvider>

      <CartProvider>
        <WishlistProvider>
          {children}
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>

  )
}
