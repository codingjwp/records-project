import { storageInfo } from '@/app/_api/serverFetch'
import styles from './stoages.module.css'
import Card from '../_components/_sc/Card'

const Storages = async () => {
  const storages = await storageInfo()
  return (
    <main className={styles.storages_wrapper}>
      <div className={styles.inner}>
        {storages.map((storage) => {
          return <Card key={storage.databaseId} {...storage} />
        })}
      </div>
    </main>
  )
}

export default Storages
