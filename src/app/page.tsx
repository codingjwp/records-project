import SvgItem from "./_components/SvgItem"
import styles from './rootPage.module.css';
import { esdokdo } from '@/app/_fonts/fontType';

async function totalContributionsFetch() {
  const now = new Date();
  const year =  new Date(now.getFullYear(), 0, 1, 0, 0, 0).toISOString();
  const toDay = now.toISOString();
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${process.env.ACESS_TOKEN}`,
    },
    body: JSON.stringify({
      query: `
        query {
          viewer {
            pinnedItems(first: 10) {
              totalCount
            }
            contributionsCollection(from: "${year}" to: "${toDay}") {
              contributionCalendar {
                totalContributions
              }
            }
          }
        }`,
    }),
    next: {
      revalidate: 60
    }
  }
  const response = await fetch(`${process.env.GITHUB_API}`, options)
  if (!response.ok) throw new Error("fetch error response");
  const { data } = await response.json();
  
  return { 
    totalPinStorages: data.viewer.pinnedItems.totalCount,
    totalContributions: data.viewer.contributionsCollection.contributionCalendar.totalContributions
  };
}

export default async function Home() {
  const { totalPinStorages, totalContributions } = await totalContributionsFetch();

  return (
    <main className={styles.main_wrap}>
      <div className={styles.inner}>
        <SvgItem wd={256} hi={256} id="cube" color="mn"/>
        <h2 className={`${styles.main_title} ${esdokdo.className}`}>나의 일생 중 한 부분입니다.</h2>
        <div className={styles.description}>
          <SvgItem wd={36} hi={36} id="storages" color="ft"/>
          <span className={styles.sub_text}>{totalPinStorages}</span>
          <SvgItem wd={36} hi={36} id="commit" color="ft"/>
          <span className={styles.sub_text}>{totalContributions}</span>
        </div>
      </div>
    </main>
  )
}
