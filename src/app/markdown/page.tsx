import Link from 'next/link';
import styles from './mdPage.module.css';
import { markdownText } from '../_api/serverFetch';

const MarkdownPage = async ({searchParams}: {searchParams: {name: string, file: string}}) => {
  const folder = Buffer.from(searchParams.name, 'base64').toString('utf-8')
  const file = Buffer.from(searchParams.file, 'base64').toString('utf-8')
  const text = await markdownText(folder, file);
  return (
  <div>
    <div className={styles.header}>
      <span className={styles.title}>{folder}</span>
      <Link href={{
        pathname: 'records',
        query: {name: searchParams.name}
      }}><span>목록</span></Link>
    </div>
    {text}
  </div>)
}

export default MarkdownPage;