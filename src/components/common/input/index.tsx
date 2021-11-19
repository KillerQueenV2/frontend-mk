import styles from './styles.module.scss'

import { useField } from '@unform/core'
import { useRef } from 'react'
import { useEffect } from 'react'
interface Props  {
  name: string
  className?: string
  mask?: string
}

type InputProps = JSX.IntrinsicElements['input'] & Props

export function Input({ name, className, ...rest }: InputProps) {
  const inputRef = useRef(null)
  const { fieldName, registerField, defaultValue } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    })
  }, [fieldName, registerField])

  return (
    <input
      className={className || styles.customInput}
      ref={inputRef}
      defaultValue={defaultValue}
      {...rest}
    />
  )
}
