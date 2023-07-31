import { useContext, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { ACTION_TYPES, StoreContext } from '@/store/store-context'

import styles from '@/styles/Home.module.css'
import Banner from '@/components/banner'
import React, { useEffect } from 'react'
import Card from '@/components/Card/Card'

import { fetchCoffeeStores } from '@/lib/coffee-stores'
import { CoffeeStore } from '@/types'
import useTrackLocation from '@/hooks/use-track-location'

type HomeProps = {
  coffeeStores: CoffeeStore[]
}

export async function getStaticProps() {
  const coffeeStores = (await fetchCoffeeStores()) as CoffeeStore[]

  return {
    props: {
      coffeeStores,
    },
  }
}

export default function Home(props: HomeProps) {
  const { state, dispatch } = useContext(StoreContext)
  const { latLong, coffeeStores } = state

  const [coffeeStoresError, setCoffeeStoresError] = useState<null | string>(
    null,
  )
  const { locationErrorMsg, isFindingLocation, handleTrackLocation } =
    useTrackLocation()

  useEffect(() => {
    const fetchNearbyStores = async () => {
      if (latLong) {
        try {
          const res = await fetch(
            `/api/getCoffeeStoresByLocation?latLong=${latLong}&limit=30`,
          )
          const fetchedCoffeeStores = await res.json()

          dispatch({
            type: ACTION_TYPES.SET_COFFEE_STORES,
            payload: {
              coffeeStores: fetchedCoffeeStores.coffeeStores,
            },
          })
          setCoffeeStoresError('')
        } catch (err) {
          console.log('error fetching nearby stores', err)
          setCoffeeStoresError(`Can't find nearby stores ${err}`)
        }
      }
    }

    fetchNearbyStores()
  }, [latLong, dispatch])

  const handleOnBannerButtonClick = () => {
    handleTrackLocation()
  }

  return (
    <>
      <Head>
        <title>Coffee Connoisseur</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main}`}>
        <Banner
          buttonText={isFindingLocation ? 'Locating ...' : 'View nearby stores'}
          onClickHandler={handleOnBannerButtonClick}
        />
        {locationErrorMsg && <p>Something went wrong: {locationErrorMsg}</p>}
        {coffeeStoresError && <p>Something went wrong: {coffeeStoresError}</p>}
        <div className={styles.heroImage}>
          <Image
            src="/static/hero-image.png"
            width={700}
            height={400}
            alt="coffee connoisseur hero image"
          />
        </div>
        {coffeeStores.length > 0 && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}>Stores near me</h2>
            <div className={styles.cardLayout}>
              {coffeeStores.map((coffeeStore) => (
                <Card
                  name={coffeeStore.name}
                  imgUrl={
                    coffeeStore.imgUrl ||
                    'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
                  }
                  href={`/coffee-store/${coffeeStore.id}`}
                  key={coffeeStore.id}
                />
              ))}
            </div>
          </div>
        )}
        {props.coffeeStores.length > 0 && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}>Toronto stores</h2>
            <div className={styles.cardLayout}>
              {props.coffeeStores.map((coffeeStore) => (
                <Card
                  name={coffeeStore.name}
                  imgUrl={
                    coffeeStore.imgUrl ||
                    'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
                  }
                  href={`/coffee-store/${coffeeStore.id}`}
                  key={coffeeStore.id}
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  )
}
