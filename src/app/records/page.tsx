import { recordRoot } from '../_api/dataFetch';
import Collapsible from '../_components/Collapsible';
import styles from './recordsPage.module.css'

const RecordsPage = async () => {
  const folders = await recordRoot();
  return (
    <div className={styles.inner}>
      {
        folders.map(folder => {
          return (
            <Collapsible key={folder.oid} {...folder}>
            </Collapsible>
          )
        })
      }
    </div>
  )
}

export default RecordsPage;