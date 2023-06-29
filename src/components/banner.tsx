import React from 'react'

import styles from './banner.module.css'

type BannerProps = {
  buttonText: string
  onClickHandler: () => void
}

const Banner = (props: BannerProps) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <span className={styles.title1}>Coffee</span>
        <span className={styles.title2}>Connoisseur</span>
      </h1>
      <p className={styles.subtitle}>Discover your local coffee shops!</p>
      <button className={styles.button} onClick={props.onClickHandler}>
        {props.buttonText}
      </button>
    </div>
  )
}

export default Banner
