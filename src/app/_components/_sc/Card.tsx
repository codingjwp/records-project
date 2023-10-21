import Image from 'next/image';
import Link from 'next/link';
import styles from './card.module.css';

interface CardProps {
  name: string
  description: string
  url: string
  openGraphImageUrl: string
}

const Card = ({ name, description, url, openGraphImageUrl }: CardProps) => {
  return (
    <div className={styles.card}>
      <strong className={styles.title}>{name}</strong>
      <div className={styles.card_img_cover}>
        <Link href={url} target='_blank'>
          <Image width={320} height={160} src={openGraphImageUrl} alt={name} loading='lazy' />
        </Link>
      </div>
      <p className={styles.description}>{description}</p>
    </div>
  )
}

export default Card;