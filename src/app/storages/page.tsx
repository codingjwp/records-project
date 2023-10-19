import { storageInfo } from '@/app/_api/dataFetch';
import styles from './stoages.module.css';
import Card from '../_components/Card';

const Storages = async () => {
  const nodes = await storageInfo();
  return (
    <main className={styles.storages_wrapper}>
      <div className={styles.inner}>
      {
        nodes.map((node) => {
          return (
            <Card key={node.databaseId} {...node} />
          )
        })
      }
      </div>
    </main>
  )
}

export default Storages;