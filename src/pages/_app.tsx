import "@/styles/globals.css"
import type { AppProps } from "next/app"

const Footer = () => {
  return <footer>Some footer content</footer>
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Footer />
    </>
  )
}
