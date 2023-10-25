import Headers from '@/app/_components/_cc/Headers'
import { headerList } from '@/app/_api/serverFetch'
import { notFound } from 'next/navigation'

const ServerHeader = async () => {
  const lists = await headerList()
  if (!lists) notFound()

  return <Headers lists={lists} />
}

export default ServerHeader
