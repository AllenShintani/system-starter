'use client'

import React from 'react'
import { trpc } from '@/utils/trpc'

export default function TopPage() {
  const { data } = trpc.userRouter.getUser.useQuery(undefined, {
    retry: false,
  })

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <h1 style={{ fontSize: '4rem' }}>Hello, {data?.firstName}!</h1>
    </div>
  )
}
