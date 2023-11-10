import styles from './mdLayout.module.css'

const MarkdownLayout = ({ children }: { children: React.ReactNode }) => {
  return <main className={styles.markdown}>{children}</main>
}

export default MarkdownLayout
