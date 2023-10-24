import styles from './mdheader.module.css'
import Link from 'next/link'

const MdHeader = ({ folder, name }: { folder: string; name: string }) => {
  return (
    <div className={styles.header}>
      <span className={styles.title}>{folder}</span>
      <Link
        href={{
          pathname: 'records',
          query: { name: name },
        }}
      >
        <span>목록</span>
      </Link>
    </div>
  )
}

export default MdHeader
