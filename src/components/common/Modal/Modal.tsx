import { useEffect, useRef, type ReactNode } from 'react';

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
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const titleClassName = actionLabel
    ? styles.title
    : `${styles.title} ${styles.titleOnly}`;

  useEffect(() => {
    const previouslyFocusedElement =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') {
        return;
      }

      const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );

      if (!focusableElements?.length) {
        event.preventDefault();
        modalRef.current?.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (
        event.shiftKey &&
        (document.activeElement === firstElement ||
          !modalRef.current?.contains(document.activeElement))
      ) {
        event.preventDefault();
        lastElement.focus();
      } else if (
        !event.shiftKey &&
        (document.activeElement === lastElement ||
          !modalRef.current?.contains(document.activeElement))
      ) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', trapFocus);
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', trapFocus);
      previouslyFocusedElement?.focus();
    };
  }, []);

  return (
    <div className={styles.overlay} role="presentation">
      <div
        ref={modalRef}
        className={styles.modal}
        role={role}
        aria-modal="true"
        aria-label={ariaLabel}
        tabIndex={-1}
      >
        <button
          ref={closeButtonRef}
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
