import Headers from '@/app/_components/_cc/Headers'
import { headerList } from '@/app/_api/serverFetch'

export const revalidate = 86400

const ServerHeader = async () => {
  const lists = await headerList()

  return <Headers lists={lists} />
}

export default ServerHeader
