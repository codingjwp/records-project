import styles from './mdPage.module.css'
import MdHeader from '../_components/_sc/MdHeader'
import { markdownText } from '../_api/serverFetch'
import { transMdOfHtml } from '../_api/transMdOfHtml'
import { notFound } from 'next/navigation'

export const revalidate = 86400

const MarkdownPage = async ({
  searchParams,
}: {
  searchParams: { name: string; file: string }
}) => {
  const folder = Buffer.from(searchParams.name, 'base64').toString('utf-8')
  const file = Buffer.from(searchParams.file, 'base64').toString('utf-8')
  const text = await markdownText(folder, file)
  if (!text) notFound()
  const test = await transMdOfHtml(text)

  return (
    <>
      <MdHeader folder={folder} name={searchParams.name} />
      <div
        className={styles.convert}
        dangerouslySetInnerHTML={{ __html: test }}
      ></div>
    </>
  )
}

export default MarkdownPage
