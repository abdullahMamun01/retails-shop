import { Spinner } from '@/components/ui/Spinner'
import React from 'react'

export default function loading() {
  return (
    <div className='min-h-scree'>
        <Spinner size="large"/>
    </div>
  )
}
