import React from 'react'
import { useRouter } from 'next/router'

const CoffeeStore = () => {
  const router = useRouter()
  const { id } = router.query
  console.log({ router })

  return <div>coffee-store page {id}</div>
}

export default CoffeeStore
