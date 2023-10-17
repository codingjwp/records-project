'use client';

import styles from './headers.module.css';
import { noto } from '@/app/_fonts/fontType';
import Link from 'next/link';
import { useState } from 'react';


const Headers = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuOpenOfClose = () => {
    setIsOpen(!isOpen);
  }

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <h1 className={`${styles.logo} ${noto.className}`} ><Link href={"/"}>기록</Link></h1>
        <button type='button' className={[styles.view_menu, isOpen ? styles.view : ''].join(" ")} onClick={menuOpenOfClose}>
          <span className='hidden_text'>Menu</span>
        </button>
        <nav className={[styles.navigator, isOpen ? styles.open : ''].join(" ")}>
          <ul>
            <li><Link href={"/"}>저장소</Link></li>
            <li><Link href={"/"}>기록소</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Headers;