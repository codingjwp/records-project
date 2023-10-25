import styles from './recordsPage.module.css'
import { recordsList } from '@/app/_api/serverFetch'
import Collapsible from '../_components/_sc/Collapsible'
import { notFound } from 'next/navigation'

export const revalidate = 86400

const RecordsPage = async ({
  searchParams,
}: {
  searchParams: { name: string }
}) => {
  const files = await recordsList(
    Buffer.from(searchParams.name, 'base64').toString('utf-8'),
  )
  if (!files) notFound()

  return (
    <main className={styles.records_wrap}>
      <div className={styles.inner}>
        {files.map((item) => {
          return (
            <Collapsible key={item.oid} {...item} parent={searchParams.name} />
          )
        })}
      </div>
    </main>
  )
}

export default RecordsPage
