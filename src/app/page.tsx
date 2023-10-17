import SvgItem from "./_components/SvgItem"
import styles from './rootPage.module.css';
import { esdokdo } from '@/app/_fonts/fontType';

export default function Home() {
  return (
    <main className={styles.main_wrap}>
      <div className={styles.inner}>
        <SvgItem wd={256} hi={256} id="cube" />
        <h2 className={`${styles.main_title} ${esdokdo.className}`}>나의 일생 중 한 부분입니다.</h2>
      </div>
    </main>
  )
}
