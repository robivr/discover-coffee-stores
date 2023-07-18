import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'

import { fetchCoffeeStores } from '@/lib/coffee-stores'
import { CoffeeStore } from '@/types'

import styles from '@/styles/coffee-store.module.css'

export async function getStaticProps({ params }: { params: { id: string } }) {
  console.log('params', params)
  const coffeeStores = await fetchCoffeeStores()
  const findCoffeeStoreById = coffeeStores.find(
    (coffeeStore: CoffeeStore) => coffeeStore.id.toString() === params.id,
  )
  return {
    props: {
      coffeeStore: findCoffeeStoreById ? findCoffeeStoreById : {},
    },
  }
}

export async function getStaticPaths() {
  const coffeeStores = await fetchCoffeeStores()

  return {
    paths: coffeeStores.map((coffeeStore: CoffeeStore) => ({
      params: { id: coffeeStore.id.toString() },
    })),
    fallback: true,
  }
}

type CoffeeStoreProps = {
  coffeeStore: CoffeeStore
}

const CoffeeStore = (props: CoffeeStoreProps) => {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading ...</div>
  }

  const { imgUrl, name, address, locality } = props.coffeeStore

  const handleUpvoteButton = () => {}

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <Link href="/">
            <div className={styles.backToHomeLink}>⬅ Back to home</div>
          </Link>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image
            src={
              imgUrl ||
              'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
            }
            width={600}
            height={600}
            alt={name}
          />
        </div>
        <div className={`${styles.col2} glass`}>
          {address && (
            <div className={styles.iconWrapper}>
              <Image
                src="/static/icons/places.svg"
                width={24}
                height={24}
                alt=""
              />
              <p className={styles.text}>{address}</p>
            </div>
          )}
          {locality && (
            <div className={styles.iconWrapper}>
              <Image
                src="/static/icons/nearMe.svg"
                width={24}
                height={24}
                alt=""
              />
              <p className={styles.text}>{locality}</p>
            </div>
          )}
          <div className={styles.iconWrapper}>
            <Image src="/static/icons/star.svg" width={24} height={24} alt="" />
            <p className={styles.text}>1</p>
          </div>
          <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
            Upvote
          </button>
        </div>
      </div>
    </div>
  )
}

export default CoffeeStore
