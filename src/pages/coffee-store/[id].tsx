import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { GetStaticPropsContext } from 'next'

import coffeeStoresData from '../../data/coffee-stores.json'

export function getStaticProps({ params }: { params: { id: string } }) {
  console.log('params', params)
  return {
    props: {
      coffeeStore: coffeeStoresData.find(
        (coffeeStore) => coffeeStore.id.toString() === params.id,
      ),
    },
  }
}

export function getStaticPaths() {
  return {
    paths: coffeeStoresData.map(({ id }) => ({
      params: { id: id.toString() },
    })),
    fallback: false,
  }
}

type CoffeeStoreProps = {
  coffeeStore: {
    name: string
    imgUrl: string
    href: string
    id: number
    address: string
  }
}

const CoffeeStore = (props: CoffeeStoreProps) => {
  console.log('CoffeeStore props', props)
  const router = useRouter()
  const { id } = router.query
  console.log({ router })

  return (
    <div>
      coffee-store page {id}
      <Link href="/">Back to home</Link>
      <Link href="/coffee-store/2">Go to dynamic page</Link>
      <Link href="/courses/nextjs">Go to NextJS page</Link>
      <p>{props.coffeeStore.address}</p>
      <p>{props.coffeeStore.name}</p>
    </div>
  )
}

export default CoffeeStore
