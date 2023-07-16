import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import coffeeStoresData from '@/data/coffee-stores.json'
import Head from 'next/head'

import styles from '@/styles/coffee-store.module.css'
import Image from 'next/image'

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
    fallback: true,
  }
}

type CoffeeStoreProps = {
  coffeeStore: {
    name: string
    imgUrl: string
    href: string
    id: number
    address: string
    neighbourhood: string
  }
}

const CoffeeStore = (props: CoffeeStoreProps) => {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading ...</div>
  }

  const { address, href, id, imgUrl, name, neighbourhood } = props.coffeeStore

  const handleUpvoteButton = () => {}

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <Link href="/">
            <div className={styles.backToHomeLink}>Back to home</div>
          </Link>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image src={imgUrl} width={600} height={600} alt={name} />
        </div>
        <div className={`${styles.col2} glass`}>
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/places.svg"
              width={24}
              height={24}
              alt=""
            />
            <p className={styles.text}>{address}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/nearMe.svg"
              width={24}
              height={24}
              alt=""
            />
            <p className={styles.text}>{neighbourhood}</p>
          </div>
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
