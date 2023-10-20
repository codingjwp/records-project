import styles from './recordsLayout.module.css';

const RecordsLayout = ({children} : {children: React.ReactNode}) => {
  return (
    <main className={styles.records_wrap}>
      {children}
    </main>
  )
}

export default RecordsLayout;