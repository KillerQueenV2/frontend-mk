import styles from './styles.module.scss'

interface PropsMessage {
  type: string
  children: React.ReactNode
}

export function Message({ type, children }: PropsMessage) {
  return (
    <span className={styles[type]}>{children}</span>
  )
}