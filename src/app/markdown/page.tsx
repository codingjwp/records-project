import styles from './mdPage.module.css'
import MdHeader from '../_components/_sc/MdHeader'
import { markdownText, convertUtfToBase64 } from '../_api/serverFetch'
import { transMdOfHtml } from '../_api/transMdOfHtml'
import { notFound } from 'next/navigation'

export const revalidate = 86400

const MarkdownPage = async ({
  searchParams,
}: {
  searchParams: { paths: string }
}) => {
  const paths = convertUtfToBase64('utf8', searchParams.paths)
  const text = await markdownText(paths)
  if (!text) notFound()
  const test = await transMdOfHtml(text)

  return (
    <div className={styles.inner}>
      <MdHeader paths={paths} />
      <div
        className={styles.convert}
        dangerouslySetInnerHTML={{ __html: test }}
      ></div>
    </div>
  )
}

export default MarkdownPage
