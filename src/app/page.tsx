import styles from './rootPage.module.css'
import SvgItem from '@/app/_components/_sc/SvgItem'
import { totalCountInfo } from './_api/serverFetch'
import { notFound } from 'next/navigation'

export const revalidate = 86400

export default async function Home() {
  const data = await totalCountInfo()
  if (!data) notFound()

  return (
    <main className={styles.main_wrap}>
      <div className={styles.inner}>
        <SvgItem size="lr" id="cube" color="mn" />
        <h2 className={styles.main_title}>나의 일생 중 한 부분입니다.</h2>
        <div className={styles.description}>
          <SvgItem size="md" id="storages" color="ft" />
          <span className={styles.sub_text}>{data.totalPinStorages}</span>
          <SvgItem size="md" id="commit" color="ft" />
          <span className={styles.sub_text}>{data.totalContributions}</span>
        </div>
      </div>
    </main>
  )
}
