import styles from './styles.module.scss'
interface Props {
  className?: string
  name: string
}

type InputProps = JSX.IntrinsicElements['button'] & Props

export function Button({ className, name, ...rest }: InputProps) {
  return (
    <button
      className={className || styles.btn}
      {...rest}
    >
      {name}
    </button>
  )
}