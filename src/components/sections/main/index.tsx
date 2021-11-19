import styles from './styles.module.scss';

interface PropsSection {
  children: React.ReactNode
}

export function Main(props: PropsSection) {
  return (
    <div id={styles.main}>
      {props.children}
    </div>
  )
}