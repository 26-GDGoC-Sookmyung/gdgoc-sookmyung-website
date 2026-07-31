import type { TextareaHTMLAttributes } from 'react';

import styles from './Form.module.css';

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  hasError?: boolean;
  size?: 'medium' | 'large';
};

export function Textarea({
  className,
  hasError = false,
  size = 'large',
  ...props
}: TextareaProps) {
  const textareaClassName = [
    styles.control,
    size === 'medium' ? styles.textareaMedium : styles.textarea,
    hasError ? styles.controlError : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return <textarea className={textareaClassName} {...props} />;
}
