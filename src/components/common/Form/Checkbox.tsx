import type { InputHTMLAttributes, ReactNode } from 'react';

import checkboxChecked from '@/assets/icons/common/checkbox/checkbox-checked.svg';
import checkboxUnchecked from '@/assets/icons/common/checkbox/checkbox-unchecked.svg';

import styles from './Form.module.css';

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label: ReactNode;
};

export function Checkbox({ className, label, ...props }: CheckboxProps) {
  const isChecked = Boolean(props.checked);

  return (
    <label className={`${styles.checkbox} ${className ?? ''}`}>
      <input className={styles.checkboxInput} type="checkbox" {...props} />
      <span className={styles.checkboxBox} aria-hidden="true">
        <img src={isChecked ? checkboxChecked : checkboxUnchecked} alt="" />
      </span>
      <span>{label}</span>
    </label>
  );
}
