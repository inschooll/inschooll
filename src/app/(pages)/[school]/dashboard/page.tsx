import React from 'react'

export default function Dashboard({params}: {params: {school: string}}) {
  return (
    <div>Dashboard: {params.school}</div>
  )
}
