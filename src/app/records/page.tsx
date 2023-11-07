import styles from './recordsPage.module.css'
import { recordsList, convertUtfToBase64 } from '@/app/_api/serverFetch'
import Collapsible from '../_components/_sc/Collapsible'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export const revalidate = 86400

const RecordsPage = async ({
  searchParams,
}: {
  searchParams: { paths: string }
}) => {
  const returnPaths = convertUtfToBase64('utf8', searchParams.paths)
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
                query: { paths: convertUtfToBase64('base64', pathsSplit.at(0) as string) }}}
                className={styles.returnlink}
                ><span>•</span></Link></div>
            <div className={styles.returnlink_wrap}>
              <Link href={{
              pathname: 'records',
              query: { paths: convertUtfToBase64('base64', pathsSplit.slice(0, -1).join('/'))}}}
              className={styles.returnlink}
              ><span>•••</span></Link></div>
          </>
        }
        {files.map((item) => {
          return (
            <Collapsible key={item.oid} {...item} parent={convertUtfToBase64('base64', item.path)} />
          )
        })}
      </div>
    </main>
  )
}

export default RecordsPage
