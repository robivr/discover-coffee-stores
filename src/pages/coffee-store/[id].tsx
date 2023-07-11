import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

const CoffeeStore = () => {
  const router = useRouter()
  const { id } = router.query
  console.log({ router })

  return (
    <div>
      coffee-store page {id}
      <Link href="/">Back to home</Link>
      <Link href="/coffee-store/2">Go to dynamic page</Link>
      <Link href="/courses/nextjs">Go to NextJS page</Link>
    </div>
  )
}

export default CoffeeStore
