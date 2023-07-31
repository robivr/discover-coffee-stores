import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import useSWR from 'swr'
import { StoreContext } from '@/store/store-context'
import { isEmpty } from '@/utils'

import { fetchCoffeeStores } from '@/lib/coffee-stores'
import { CoffeeStore } from '@/types'

import styles from '@/styles/coffee-store.module.css'

export async function getStaticProps({ params }: { params: { id: string } }) {
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

const CoffeeStore = (initialProps: CoffeeStoreProps) => {
  const router = useRouter()

  const id = router.query.id

  const [coffeeStore, setCoffeeStore] = useState(initialProps.coffeeStore)
  const [ratingCount, setRatingCount] = useState(0)

  const {
    state: { coffeeStores },
  } = useContext(StoreContext)

  const handleCreateCoffeeStore = async (coffeeStore: CoffeeStore) => {
    try {
      const { id, name, rating, imgUrl, locality, address } = coffeeStore

      const response = await fetch('/api/createCoffeeStore', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          name,
          rating: rating || 0,
          imgUrl,
          locality: locality || '',
          address: address || '',
        }),
      })

      const dbCoffeeStore = await response.json()
    } catch (err) {
      console.error('Error creating coffee store', err)
    }
  }

  useEffect(() => {
    if (isEmpty(initialProps.coffeeStore)) {
      if (coffeeStores.length > 0) {
        const findCoffeeStoreById = coffeeStores.find(
          (coffeeStore: CoffeeStore) => coffeeStore.id.toString() === id,
        ) as CoffeeStore | undefined

        if (findCoffeeStoreById) {
          setCoffeeStore(findCoffeeStoreById)
          handleCreateCoffeeStore(findCoffeeStoreById)
        }
      }
    } else {
      handleCreateCoffeeStore(initialProps.coffeeStore)
    }
  }, [coffeeStores, id, initialProps.coffeeStore])

  const fetchCoffeeStore = (url: string) => fetch(url).then((res) => res.json())

  const { data, error } = useSWR(
    `/api/getCoffeeStoreById?id=${id}`,
    fetchCoffeeStore,
  )

  useEffect(() => {
    if (data && data.length > 0) {
      setCoffeeStore(data[0])
      setRatingCount(data[0].rating)
    }
  }, [data])

  if (error) {
    return <div>Something went wrong retrieving cofee store page</div>
  }

  if (router.isFallback) {
    return <div>Loading ...</div>
  }

  const { imgUrl, name, address, locality } = coffeeStore

  const handleUpvoteButton = async () => {
    try {
      const { id } = coffeeStore

      const response = await fetch('/api/favoriteCoffeeStoreById', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
        }),
      })

      const dbCoffeeStore = await response.json()

      if (dbCoffeeStore?.length > 0) {
        setRatingCount(ratingCount + 1)
      }
    } catch (err) {
      console.error('Error upvoting coffee store', err)
    }
  }

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
            <p className={styles.text}>{ratingCount}</p>
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
