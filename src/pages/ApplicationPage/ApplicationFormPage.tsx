import { useEffect, useMemo, useState } from 'react';
import {
  Navigate,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';

import {
  Checkbox,
  CheckboxGroup,
  FormActionBar,
  FormButton,
  FormField,
  FormFieldList,
  FormLayout,
  FormSectionHeader,
  FormStepper,
  Textarea,
  TextInput,
} from '@/components/common/Form';
import type {
  ApplicationApiStatus,
  ApplicationFormStep,
  ApplicationQuestionOption,
  ApplicationQuestion,
  ApplicationRouteSlug,
} from '@/types/application';

import {
  getApplicationDetail,
  getTeamMemberInterviewOptions,
} from './applicationApi';
import {
  getApplicationDraft,
  removeApplicationDraft,
  saveApplicationDraft,
} from './applicationDraftStorage';
import styles from './ApplicationFormPage.module.css';
import { getApplicationFormSteps } from './applicationFormData';

type FormValues = Record<string, string | string[]>;
type FormErrors = Record<string, string>;

function getInitialValues(
  formSteps: ReturnType<typeof getApplicationFormSteps>,
) {
  return formSteps.reduce<FormValues>((values, step) => {
    step.questions.forEach((question) => {
      values[question.id] = question.type === 'checkbox' ? [] : '';
    });

    return values;
  }, {});
}

export function ApplicationFormPage() {
  const navigate = useNavigate();
  const { applicationType } = useParams();
  const [searchParams] = useSearchParams();
  const isSupportedApplicationType = isApplicationRouteSlug(applicationType);
  const applicationRouteSlug = isSupportedApplicationType
    ? applicationType
    : 'member';
  const formMode = searchParams.get('mode');
  const isPreviewMode = formMode === 'preview';
  const isEditMode = formMode === 'edit';
  const [teamMemberInterviewOptions, setTeamMemberInterviewOptions] = useState<
    ApplicationQuestionOption[]
  >([]);
  const formSteps = useMemo(
    () =>
      withTeamMemberInterviewOptions(
        getApplicationFormSteps(applicationRouteSlug),
        teamMemberInterviewOptions,
      ),
    [applicationRouteSlug, teamMemberInterviewOptions],
  );
  const initialValues = useMemo(() => getInitialValues(formSteps), [formSteps]);
  const initialDraft = getApplicationDraft(applicationRouteSlug);
  const initialStepIndex = Math.min(
    initialDraft?.currentStepIndex ?? 0,
    formSteps.length - 1,
  );
  const [currentStepIndex, setCurrentStepIndex] = useState(initialStepIndex);
  const [values, setValues] = useState<FormValues>(
    initialDraft?.values
      ? { ...initialValues, ...initialDraft.values }
      : initialValues,
  );
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [applicationStatus, setApplicationStatus] =
    useState<ApplicationApiStatus | null>(null);

  const stepperItems = useMemo(
    () => formSteps.map(({ id, label }) => ({ id, label })),
    [formSteps],
  );
  const currentStep = formSteps[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === formSteps.length - 1;
  const shouldHideDraftButton =
    applicationStatus === 'SUBMITTED' || (isEditMode && applicationStatus !== 'DRAFT');

  useEffect(() => {
    if (!isSupportedApplicationType) {
      return;
    }

    const abortController = new AbortController();

    getApplicationDetail(applicationRouteSlug, abortController.signal)
      .then((applicationDetail) => {
        if (abortController.signal.aborted) {
          return;
        }

        setApplicationStatus(applicationDetail?.applicationStatus ?? null);

        if (applicationDetail) {
          setValues((prevValues) => ({
            ...prevValues,
            ...applicationDetail.values,
          }));
        }
      })
      .catch(() => {
        if (abortController.signal.aborted) {
          return;
        }

        setApplicationStatus(null);
      });

    return () => {
      abortController.abort();
    };
  }, [applicationRouteSlug, isSupportedApplicationType]);

  useEffect(() => {
    if (!isSupportedApplicationType || applicationRouteSlug !== 'team-member') {
      setTeamMemberInterviewOptions([]);
      return;
    }

    const abortController = new AbortController();

    getTeamMemberInterviewOptions(abortController.signal)
      .then((interviewOptions) => {
        if (abortController.signal.aborted) {
          return;
        }

        setTeamMemberInterviewOptions(interviewOptions);
      })
      .catch(() => {
        if (abortController.signal.aborted) {
          return;
        }

        setTeamMemberInterviewOptions([]);
      });

    return () => {
      abortController.abort();
    };
  }, [applicationRouteSlug, isSupportedApplicationType]);

  const validateStep = () => {
    const nextErrors: FormErrors = {};

    currentStep.questions.forEach((question) => {
      if (!question.required) {
        return;
      }

      const value = values[question.id];
      const isEmpty = Array.isArray(value) ? value.length === 0 : !value.trim();

      if (isEmpty) {
        nextErrors[question.id] = '필수 항목을 입력해주세요.';
      }
    });

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleTextChange = (questionId: string, value: string) => {
    setValues((prevValues) => ({ ...prevValues, [questionId]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [questionId]: '' }));
  };

  const handleCheckboxChange = (
    question: ApplicationQuestion,
    optionId: string,
    checked: boolean,
  ) => {
    setValues((prevValues) => {
      const previousValue = prevValues[question.id];
      const selectedOptions = Array.isArray(previousValue) ? previousValue : [];
      const nextValue = checked
        ? [...selectedOptions, optionId]
        : selectedOptions.filter(
            (selectedOption) => selectedOption !== optionId,
          );

      return { ...prevValues, [question.id]: nextValue };
    });
    setErrors((prevErrors) => ({ ...prevErrors, [question.id]: '' }));
  };

  const handlePrevious = () => {
    if (isFirstStep) {
      return;
    }

    setCurrentStepIndex((prevStepIndex) => prevStepIndex - 1);
    setErrors({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNext = () => {
    if (isPreviewMode) {
      if (isLastStep) {
        navigate('/application/status');
        return;
      }

      setCurrentStepIndex((prevStepIndex) => prevStepIndex + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (!validateStep()) {
      return;
    }

    if (isLastStep) {
      if (isEditMode) {
        // TODO: Submit the updated application form through the real API.
        navigate('/application/status');
        return;
      }

      // TODO: Submit the application form through the real API.
      removeApplicationDraft(applicationRouteSlug);
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setCurrentStepIndex((prevStepIndex) => prevStepIndex + 1);
    setErrors({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveDraft = () => {
    saveApplicationDraft(applicationRouteSlug, {
      currentStepIndex,
      values,
      savedAt: new Date().toISOString(),
    });
  };

  const applicationTypeLabel =
    applicationRouteSlug === 'team-member' ? 'Team Member' : 'Member';
  const completeNoticeItems = [
    '서류 합격자에 대하여 8월 19일에 면접 안내 메일을 보내드릴 예정입니다.',
    '가입하신 이메일 주소로 면접 일정, 합격 여부 등을 알려드릴 예정입니다.',
    '일정은 변동 가능성이 있으며, 일정이 변경될 시 사이트를 통해 안내해 드리겠습니다.',
  ];

  if (!isSupportedApplicationType) {
    return <Navigate to="/application" replace />;
  }

  if (isSubmitted) {
    return (
      <section
        className={styles.completePage}
        aria-labelledby="application-complete-title"
      >
        <h1 className={styles.completeTitle} id="application-complete-title">
          <span>{applicationTypeLabel} 지원서 제출이</span>
          <span>완료되었습니다</span>
        </h1>
        <ul className={styles.completeDescription}>
          {completeNoticeItems.map((noticeItem) => (
            <li key={noticeItem}>{noticeItem}</li>
          ))}
        </ul>
        <div className={styles.completeActions}>
          <FormButton
            className={`${styles.completeButton} ${styles.completeButtonSecondary}`}
            variant="secondary"
            onClick={() => {
              setIsSubmitted(false);
              navigate(`/application/${applicationRouteSlug}?mode=preview`, {
                replace: true,
              });
            }}
          >
            지원서 보기
          </FormButton>
          <FormButton
            className={`${styles.completeButton} ${styles.completeButtonPrimary}`}
            variant="primary"
            onClick={() => navigate('/')}
          >
            메인으로
          </FormButton>
        </div>
      </section>
    );
  }

  return (
    <>
      <FormLayout>
        <FormStepper steps={stepperItems} currentStepId={currentStep.id} />
        <FormSectionHeader
          title={currentStep.title}
          description={currentStep.description}
        />

        <FormFieldList>
          {currentStep.questions.map((question) => (
            <FormField
              label={question.label}
              htmlFor={question.id}
              required={question.required}
              errorMessage={errors[question.id]}
              key={question.id}
            >
              {renderQuestion({
                question,
                value: values[question.id],
                errorMessage: errors[question.id],
                readOnly: isPreviewMode,
                onTextChange: handleTextChange,
                onCheckboxChange: handleCheckboxChange,
              })}
            </FormField>
          ))}
        </FormFieldList>
      </FormLayout>

      {isPreviewMode ? (
        <FormActionBar
          left={
            <FormButton
              variant="secondary"
              onClick={() => navigate('/application/status')}
            >
              목록으로
            </FormButton>
          }
          right={
            <div className={styles.actionGroup}>
              <FormButton
                variant="dark"
                disabled={isFirstStep}
                onClick={handlePrevious}
              >
                이전으로
              </FormButton>
              <FormButton
                variant={isLastStep ? 'primary' : 'dark'}
                onClick={handleNext}
              >
                {isLastStep ? '확인 완료' : '다음으로'}
              </FormButton>
              <FormButton
                variant="dark"
                onClick={() =>
                  navigate(`/application/${applicationRouteSlug}?mode=edit`)
                }
              >
                수정하기
              </FormButton>
            </div>
          }
        />
      ) : (
        <FormActionBar
          left={
            shouldHideDraftButton ? null : (
              <FormButton variant="secondary" onClick={handleSaveDraft}>
                임시저장
              </FormButton>
            )
          }
          right={
            <div className={styles.actionGroup}>
              <FormButton
                variant="dark"
                disabled={isFirstStep}
                onClick={handlePrevious}
              >
                이전으로
              </FormButton>
              <FormButton
                variant={isLastStep ? 'primary' : 'dark'}
                onClick={handleNext}
              >
                {isLastStep ? '제출하기' : '다음으로'}
              </FormButton>
            </div>
          }
        />
      )}
    </>
  );
}

function isApplicationRouteSlug(
  applicationType: string | undefined,
): applicationType is ApplicationRouteSlug {
  return applicationType === 'member' || applicationType === 'team-member';
}

function withTeamMemberInterviewOptions(
  formSteps: ApplicationFormStep[],
  interviewOptions: ApplicationQuestionOption[],
) {
  if (interviewOptions.length === 0) {
    return formSteps;
  }

  return formSteps.map((step) => {
    if (step.id !== 'interview') {
      return step;
    }

    return {
      ...step,
      questions: step.questions.map((question) =>
        question.id === 'interviewTimes'
          ? { ...question, options: interviewOptions }
          : question,
      ),
    };
  });
}

type RenderQuestionParams = {
  question: ApplicationQuestion;
  value: string | string[];
  errorMessage?: string;
  onTextChange: (questionId: string, value: string) => void;
  onCheckboxChange: (
    question: ApplicationQuestion,
    optionId: string,
    checked: boolean,
  ) => void;
  readOnly?: boolean;
};

function renderQuestion({
  question,
  value,
  errorMessage,
  onTextChange,
  onCheckboxChange,
  readOnly = false,
}: RenderQuestionParams) {
  if (question.type === 'textarea') {
    return (
      <Textarea
        id={question.id}
        value={typeof value === 'string' ? value : ''}
        placeholder={readOnly ? undefined : question.placeholder}
        hasError={Boolean(errorMessage)}
        rows={question.rows}
        readOnly={readOnly}
        size={question.rows === 2 ? 'medium' : 'large'}
        onChange={(event) => onTextChange(question.id, event.target.value)}
      />
    );
  }

  if (question.type === 'checkbox') {
    const selectedOptions = Array.isArray(value) ? value : [];

    return (
      <CheckboxGroup ariaLabel={question.label}>
        {question.options?.map((option) => (
          <Checkbox
            label={option.label}
            checked={selectedOptions.includes(option.id)}
            disabled={readOnly}
            onChange={(event) =>
              onCheckboxChange(question, option.id, event.target.checked)
            }
            key={option.id}
          />
        ))}
      </CheckboxGroup>
    );
  }

  return (
    <TextInput
      id={question.id}
      value={typeof value === 'string' ? value : ''}
      placeholder={readOnly ? undefined : question.placeholder}
      hasError={Boolean(errorMessage)}
      readOnly={readOnly}
      onChange={(event) => onTextChange(question.id, event.target.value)}
    />
  );
}
