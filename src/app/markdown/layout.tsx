import styles from './mdLayout.module.css'

export const revalidate = 86400

const MarkdownLayout = ({ children }: { children: React.ReactNode }) => {
  return <main className={styles.markdown}>{children}</main>
}

export default MarkdownLayout
