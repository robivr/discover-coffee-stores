import Image from 'next/image'
import Link from 'next/link'

import styles from './card.module.css'

type CardProps = {
  name: string
  imgUrl: string
  href: string
}

const Card = (props: CardProps) => {
  return (
    <div>
      <Link href={props.href} className={styles.cardLink}>
        <div className={`${styles.container} glass`}>
          <div className={styles.cardHeaderWrapper}>
            <h2 className={styles.cardHeader}>{props.name}</h2>
          </div>
          <div className={styles.cardImageWrapper}>
            <Image
              className={styles.cardImage}
              src={props.imgUrl}
              width={260}
              height={160}
              alt={props.name + ' image'}
            />
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Card
