import stepFirstActive from '@/assets/icons/common/stepper/step-first-active.svg';
import stepLastActive from '@/assets/icons/common/stepper/step-last-active.svg';
import stepMiddleActive from '@/assets/icons/common/stepper/step-middle-active.svg';
import stepMiddleInactive from '@/assets/icons/common/stepper/step-middle-inactive.svg';

import styles from './Form.module.css';

export type FormStep = {
  id: string;
  label: string;
};

type FormStepperProps = {
  steps: FormStep[];
  currentStepId: string;
};

export function FormStepper({ steps, currentStepId }: FormStepperProps) {
  const currentStepIndex = steps.findIndex((step) => step.id === currentStepId);

  return (
    <nav className={styles.stepper} aria-label="지원서 작성 단계">
      {steps.map((step, stepIndex) => {
        const isCurrent = step.id === currentStepId;
        const isActive = stepIndex <= currentStepIndex;
        const isFirst = stepIndex === 0;
        const isLast = stepIndex === steps.length - 1;
        const stepClassName = isActive
          ? `${styles.step} ${styles.stepActive}`
          : styles.step;
        const backgroundSrc = getStepBackgroundSrc({
          isActive,
          isFirst,
          isLast,
        });

        return (
          <span
            className={stepClassName}
            aria-current={isCurrent ? 'step' : undefined}
            key={step.id}
          >
            <img
              className={styles.stepBackground}
              src={backgroundSrc}
              alt=""
              aria-hidden="true"
            />
            <span className={styles.stepLabel}>{step.label}</span>
          </span>
        );
      })}
    </nav>
  );
}

type GetStepBackgroundSrcParams = {
  isActive: boolean;
  isFirst: boolean;
  isLast: boolean;
};

function getStepBackgroundSrc({
  isActive,
  isFirst,
  isLast,
}: GetStepBackgroundSrcParams) {
  if (!isActive) {
    return stepMiddleInactive;
  }

  if (isFirst) {
    return stepFirstActive;
  }

  if (isLast) {
    return stepLastActive;
  }

  return stepMiddleActive;
}
