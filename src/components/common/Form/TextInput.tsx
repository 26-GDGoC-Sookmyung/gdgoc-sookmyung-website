import type { InputHTMLAttributes } from 'react';

import styles from './Form.module.css';

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  hasError?: boolean;
};

export function TextInput({ className, hasError = false, ...props }: TextInputProps) {
  const inputClassName = [
    styles.control,
    styles.textInput,
    hasError ? styles.controlError : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return <input className={inputClassName} {...props} />;
}
