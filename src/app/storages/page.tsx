import { storageInfo } from '@/app/_api/dataFetch';
import Card from '../_components/Card';

const Storages = async () => {
  const nodes = await storageInfo();
  return (
    <div>
      {
        nodes.map((node) => {
          return (
            <Card {...node} />
          )
        })
      }
    </div>
  )
}

export default Storages;