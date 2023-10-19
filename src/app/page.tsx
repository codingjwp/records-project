import SvgItem from "./_components/SvgItem"
import styles from './rootPage.module.css';
import { esdokdo } from '@/app/_fonts/fontType';
import { totalContributionsFetch } from './_api/dataFetch';

export const revalidate = 3600;

export default async function Home() {
  const { totalPinStorages, totalContributions } = await totalContributionsFetch();

  return (
    <main className={styles.main_wrap}>
      <div className={styles.inner}>
        <SvgItem size='lr' id="cube" color="mn" />
        <h2 className={`${styles.main_title} ${esdokdo.className}`}>나의 일생 중 한 부분입니다.</h2>
        <div className={styles.description}>
          <SvgItem size='md' id="storages" color="ft" />
          <span className={styles.sub_text}>{totalPinStorages}</span>
          <SvgItem size='md' id="commit" color="ft" />
          <span className={styles.sub_text}>{totalContributions}</span>
        </div>
      </div>
    </main>
  )
}
