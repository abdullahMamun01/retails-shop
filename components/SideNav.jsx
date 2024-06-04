import Link from 'next/link'
import React from 'react'

export default function SideNav() {
    return (
        <div class="">
          
            <div class="w-full side-nav">
                <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
                <ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                    <li><Link href="/account">profile</Link></li>
                    <li><Link href="/account/orders">order items</Link></li>
                </ul>

            </div>
        </div>
    ) 
}
