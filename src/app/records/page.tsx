import styles from './recordsPage.module.css'
import { recordsList } from '@/app/_api/serverFetch'
import Collapsible from '../_components/_sc/Collapsible'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export const revalidate = 86400

const RecordsPage = async ({
  searchParams,
}: {
  searchParams: { paths: string }
}) => {
  const returnPaths = Buffer.from(searchParams.paths, 'base64').toString('utf-8')
  const files = await recordsList(returnPaths)
  const pathsSplit = returnPaths.split('/');
  if (!files) notFound()
  return (
    <main className={styles.records_wrap}>
      <div className={styles.inner}>
        {pathsSplit.length > 1 && 
          <>
            <div className={styles.returnlink_wrap}>
              <Link href={{
                pathname: 'records',
                query: { paths: Buffer.from(pathsSplit[0], 'utf-8').toString('base64')}}}
                className={styles.returnlink}
                ><span>•</span></Link></div>
            <div className={styles.returnlink_wrap}>
              <Link href={{
              pathname: 'records',
              query: { paths: Buffer.from(pathsSplit[pathsSplit.length - 2], 'utf-8').toString('base64')}}}
              className={styles.returnlink}
              ><span>•••</span></Link></div>
          </>
        }
        {files.map((item) => {
          return (
            <Collapsible key={item.oid} {...item} parent={Buffer.from(item.path, 'utf-8').toString('base64')} />
          )
        })}
      </div>
    </main>
  )
}

export default RecordsPage
