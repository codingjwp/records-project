'use client';

import { useState } from 'react';
import styles from './collapsible.module.css';

type TYPESTYLE = "tree" | "blob";

interface CollapsibleProps {
  oid: string
  name: string;
  type: string;
  children: React.ReactNode;
}

const Collapsible = ({oid, name, type, children}: CollapsibleProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const typeStyle = {
    "tree": `${styles.collapsible} ${styles.tree}`,
    "blob": `${styles.collapsible} ${styles.blob}`,
  }
  const handleChangeOpen = () => {
    setIsOpen(prev => !prev);
  }

  return (
    <section className={styles.section_wrap}>
      <button type='button' className={typeStyle[type as TYPESTYLE]} onClick={handleChangeOpen}>
        <span>{name}</span>
        {isOpen ? children : null}
      </button>
      
    </section>
  )
}

export default Collapsible;