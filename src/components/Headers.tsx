'use clinet'
import styles from './headers.module.css';
import { Noto_Sans_KR } from 'next/font/google';
import Link from 'next/link';

const noto = Noto_Sans_KR({
  weight: "600",
  variable: '--font-color',
  subsets: ['latin'],
})

const Headers = () => {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <h1 className={`${styles.logo} ${noto.className}`} ><Link href={"/"}>기록</Link></h1>
        <button className={styles.view_menu}>
          <span className='hidden_text'>Menu</span>
        </button>
        <nav className={styles.navigator}>
          <ul>
            <li><Link href={"/records"}>저장소</Link></li>
            <li><Link href={"/records"}>기록소</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Headers;