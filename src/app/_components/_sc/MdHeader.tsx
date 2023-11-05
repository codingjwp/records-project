import styles from './mdheader.module.css'
import Link from 'next/link'

const MdHeader = ({ paths }: {paths: string}) => {
  const folders = paths.split('/');
  const queryString = paths.slice(0, paths.length - folders[folders.length - 1].length - 1);
  return (
    <div className={styles.header}>
      <span className={styles.title}>{folders[folders.length - 1]}</span>
      <Link
        href={{
          pathname: 'records',
          query: { paths: Buffer.from(queryString, 'utf-8').toString('base64')},
        }}
      >
        <span>목록</span>
      </Link>
    </div>
  )
}

export default MdHeader
