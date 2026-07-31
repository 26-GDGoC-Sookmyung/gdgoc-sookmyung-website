import type { ButtonHTMLAttributes, ReactNode } from 'react';

import styles from './Form.module.css';

type FormButtonVariant = 'secondary' | 'dark' | 'primary';

type FormButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: FormButtonVariant;
};

const variantClassNames: Record<FormButtonVariant, string> = {
  secondary: styles.buttonSecondary,
  dark: styles.buttonDark,
  primary: styles.buttonPrimary,
};

export function FormButton({
  children,
  className,
  disabled = false,
  variant = 'dark',
  ...props
}: FormButtonProps) {
  const buttonClassName = [
    styles.button,
    disabled ? styles.buttonDisabled : variantClassNames[variant],
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={buttonClassName} disabled={disabled} type="button" {...props}>
      {children}
    </button>
  );
}
