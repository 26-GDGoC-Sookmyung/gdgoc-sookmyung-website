import type { ReactNode } from 'react';

import styles from './Form.module.css';

type FormFieldProps = {
  label: ReactNode;
  htmlFor?: string;
  required?: boolean;
  errorMessage?: string;
  children: ReactNode;
};

export function FormField({
  label,
  htmlFor,
  required = false,
  errorMessage,
  children,
}: FormFieldProps) {
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={htmlFor}>
        {label}
        {required ? <span className={styles.requiredMark}> *</span> : null}
      </label>
      {children}
      {errorMessage ? (
        <p className={styles.errorMessage}>{errorMessage}</p>
      ) : null}
    </div>
  );
}
