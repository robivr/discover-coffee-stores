import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'

const Page = () => {
  const router = useRouter()
  const { page } = router.query
  console.log({ router })

  return (
    <div>
      <Head>
        <title>{page}</title>
      </Head>
      <h2>Page {page}</h2>
      <br />
      <Link href="/">Back to home</Link>
    </div>
  )
}

export default Page
