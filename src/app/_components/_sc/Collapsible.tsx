import styles from './collapsible.module.css'
import Link from 'next/link'

type TYPESTYLE = 'tree' | 'blob'

interface CollapsibleProps {
  parent: string
  name: string
  type: string
}

const Collapsible = ({ parent, name, type }: CollapsibleProps) => {
  const typeStyle = {
    tree: `${styles.section_wrap} ${styles.tree}`,
    blob: `${styles.section_wrap} ${styles.blob}`,
  }
  return (
    <div className={typeStyle[type as TYPESTYLE]}>
      <Link
        href={{
          pathname: type === 'tree' ? 'records' : 'markdown',
          query: {
            paths: parent,
          },
        }}
        className={styles.collapsible}
      >
        <span>{name}</span>
      </Link>
    </div>
  )
}

export default Collapsible
