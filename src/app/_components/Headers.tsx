'use client';

import styles from './headers.module.css';
import { noto } from '@/app/_fonts/fontType';
import Link from 'next/link';
import { useState, MouseEvent } from 'react';


const Headers = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuOpenOfClose = (e: MouseEvent) => {
    const clickId = ['logo', 'storages', 'recodes']
    const target = e.target as HTMLElement;
    if (clickId.includes(target.id) || clickId.includes(target?.parentElement?.id as string))
      setIsOpen(false);
    else if (target.id === 'viewMenu' || target?.parentElement?.id === 'viewMenu')
      setIsOpen(prev => !prev);
  }

  return (
    <header className={styles.header} onClick={menuOpenOfClose}>
      <div className={styles.inner}>
        <h1 id="logo" className={`${styles.logo} ${noto.className}`} ><Link href={"/"}>기록</Link></h1>
        <button id="viewMenu" type='button' className={[styles.view_menu, isOpen ? styles.view : ''].join(" ")}>
          <span className='hidden_text'>Menu</span>
        </button>
        <nav className={[styles.navigator, isOpen ? styles.open : ''].join(" ")}>
          <ul>
            <li id="storages"><Link href={"storages"}>저장소</Link></li>
            <li id="recodes"><Link href={"/"}>기록소</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Headers;