import React from 'react'
import type { LayoutProps } from '../../../layout'

export default function Layout({children} : LayoutProps) {
  return (
    <main className='pb-10'>{children}</main>
  )
}
