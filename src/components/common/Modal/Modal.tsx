import type { ReactNode } from 'react';

import closeIcon from '@/assets/icons/common/close.svg';
import styles from './Modal.module.css';

type ModalProps = {
  title: ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  onClose: () => void;
  ariaLabel?: string;
  role?: 'alertdialog' | 'dialog';
};

export function Modal({
  title,
  actionLabel,
  onAction,
  onClose,
  ariaLabel = '안내 모달',
  role = 'dialog',
}: ModalProps) {
  const titleClassName = actionLabel
    ? styles.title
    : `${styles.title} ${styles.titleOnly}`;

  return (
    <div className={styles.overlay} role="presentation">
      <div
        className={styles.modal}
        role={role}
        aria-modal="true"
        aria-label={ariaLabel}
      >
        <button
          className={styles.closeButton}
          type="button"
          aria-label="모달 닫기"
          onClick={onClose}
        >
          <img src={closeIcon} alt="" aria-hidden="true" />
        </button>

        <div className={titleClassName}>{title}</div>

        {actionLabel ? (
          <button
            className={styles.actionButton}
            type="button"
            onClick={onAction}
          >
            {actionLabel}
          </button>
        ) : null}
      </div>
    </div>
  );
}
