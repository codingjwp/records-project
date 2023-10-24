'use client'

import styles from './headers.module.css'
import Link from 'next/link'
import { useState, MouseEvent } from 'react'

interface RecordsInfo {
  oid: string
  name: string
  nameRaw: string
  type: string
  hasLink: boolean
}

interface NavigationInfo {
  keyId: string
  label: string
  hasLink: boolean
  childs?: RecordsInfo[]
}

interface ListLinkProps extends NavigationInfo {
  isSubOpen: boolean
}

const Headers = ({ lists }: { lists: NavigationInfo[] }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubOpen, setIsSubOpen] = useState(false)

  const menuOpenOfClose = (e: MouseEvent) => {
    const target = e.target as HTMLElement
    const parent = target?.parentElement?.id ?? ''
    const hasLink = target?.id.includes('_link') || parent.includes('_link')
    const hasMenu =
      target?.id.includes('viewMenu') || parent.includes('viewMenu')
    const hasSub = target?.id.includes('_sub') || parent.includes('_sub')
    setIsOpen((prev) => (hasMenu ? !prev : hasLink ? false : prev))
    setIsSubOpen((prev) =>
      (hasLink || hasMenu) && isOpen ? false : hasSub ? !prev : prev,
    )
  }

  return (
    <header className={styles.header} onClick={menuOpenOfClose}>
      <div className={styles.inner}>
        <h1 id="logo_link" className={styles.logo}>
          <Link href={'/'}>기록</Link>
        </h1>
        <button
          id="viewMenu"
          type="button"
          className={[styles.view_menu, isOpen ? styles.view : ''].join(' ')}
        >
          <span className="hidden_text">Menu</span>
        </button>
        <nav
          className={[styles.navigator, isOpen ? styles.open : ''].join(' ')}
        >
          <ul>
            {lists.map((list) => {
              return (
                <ListLink isSubOpen={isSubOpen} key={list.keyId} {...list} />
              )
            })}
          </ul>
        </nav>
      </div>
    </header>
  )
}

function ListLink({ isSubOpen, keyId, label, hasLink, childs }: ListLinkProps) {
  if (hasLink)
    return (
      <li id={`${keyId}_${hasLink ? 'link' : 'sub'}`}>
        <Link href={keyId}>{label}</Link>
      </li>
    )
  else {
    return (
      <>
        <li
          className={styles.sub_menu}
          id={`${keyId}_${hasLink ? 'link' : 'sub'}`}
        >
          <span
            className={[styles.close, isSubOpen ? styles.open : ''].join(' ')}
          >
            {label}
          </span>
        </li>
        {isSubOpen &&
          childs?.map((item, index) => {
            return (
              <li
                key={item.oid}
                className={styles.sub_link}
                id={`${index}_${item.hasLink ? 'link' : 'sub'}`}
              >
                <Link
                  href={{
                    pathname: `${keyId}`,
                    query: { name: `${item.nameRaw}` },
                  }}
                >
                  {item.name}
                </Link>
              </li>
            )
          })}
      </>
    )
  }
}

export default Headers
