import Link from 'next/link'
import React from 'react'

export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>This school does not exist</p>
      <Link href="/">Return Home</Link>
    </div>
  )
}
