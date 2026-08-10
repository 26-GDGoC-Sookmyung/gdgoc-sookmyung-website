import { useEffect, useMemo, useState } from 'react';
import {
  Navigate,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';

import { ApiError } from '@/api/apiTypes';
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
import { Modal } from '@/components/common/Modal/Modal';
import type {
  ApplicationApiStatus,
  ApplicationFormStep,
  ApplicationQuestionOption,
  ApplicationQuestion,
  ApplicationRouteSlug,
} from '@/types/application';

import {
  createMemberApplicationRequest,
  createTeamMemberApplicationRequest,
  getApplicationDetail,
  getApplicationInterviewOptions,
  saveMemberDraft,
  saveTeamMemberDraft,
  submitMemberApplication,
  submitTeamMemberApplication,
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
  const [interviewOptions, setInterviewOptions] = useState<
    ApplicationQuestionOption[]
  >([]);
  const formSteps = useMemo(
    () =>
      withInterviewOptions(
        getApplicationFormSteps(applicationRouteSlug),
        interviewOptions,
      ),
    [applicationRouteSlug, interviewOptions],
  );
  const initialValues = useMemo(() => getInitialValues(formSteps), [formSteps]);
  const initialDraft = useMemo(
    () => getApplicationDraft(applicationRouteSlug),
    [applicationRouteSlug],
  );
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
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const [isDraftSavedModalOpen, setIsDraftSavedModalOpen] = useState(false);
  const [formMessage, setFormMessage] = useState('');
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
    applicationStatus === 'SUBMITTED' ||
    (isEditMode && applicationStatus !== 'DRAFT');

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

        if (applicationDetail && !initialDraft?.values) {
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
  }, [applicationRouteSlug, initialDraft?.values, isSupportedApplicationType]);

  useEffect(() => {
    if (!isSupportedApplicationType) {
      setInterviewOptions([]);
      return;
    }

    const abortController = new AbortController();

    getApplicationInterviewOptions(applicationRouteSlug, abortController.signal)
      .then((interviewOptions) => {
        if (abortController.signal.aborted) {
          return;
        }

        setInterviewOptions(interviewOptions);
      })
      .catch(() => {
        if (abortController.signal.aborted) {
          return;
        }

        setInterviewOptions([]);
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

  const handleNext = async () => {
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
      await handleSubmitApplication();
      return;
    }

    setCurrentStepIndex((prevStepIndex) => prevStepIndex + 1);
    setErrors({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveDraft = async () => {
    if (isSavingDraft) {
      return;
    }

    setFormMessage('');

    const request =
      applicationRouteSlug === 'team-member'
        ? createTeamMemberApplicationRequest(values)
        : createMemberApplicationRequest(values);
    const selectedInterviewTimes = getSelectedInterviewTimes(values);

    if (!request.interviewTimeSlotIds && selectedInterviewTimes.length > 0) {
      setFormMessage(
        '면접 일정 정보를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.',
      );
      return;
    }

    setIsSavingDraft(true);

    try {
      if (applicationRouteSlug === 'team-member') {
        await saveTeamMemberDraft(request);
      } else {
        await saveMemberDraft(request);
      }

      setApplicationStatus('DRAFT');
      setIsDraftSavedModalOpen(true);
    } catch (error) {
      setFormMessage(getApiErrorMessage(error));
    } finally {
      setIsSavingDraft(false);
    }

    saveApplicationDraft(applicationRouteSlug, {
      currentStepIndex,
      values,
      savedAt: new Date().toISOString(),
    });
  };

  const handleSubmitApplication = async () => {
    if (isSubmittingForm) {
      return;
    }

    setFormMessage('');

    const request =
      applicationRouteSlug === 'team-member'
        ? createTeamMemberApplicationRequest(values)
        : createMemberApplicationRequest(values);

    if (!request.interviewTimeSlotIds) {
      setFormMessage('면접 일정을 다시 선택해주세요.');
      return;
    }

    setIsSubmittingForm(true);

    try {
      if (applicationRouteSlug === 'team-member') {
        await submitTeamMemberApplication(request);
      } else {
        await submitMemberApplication(request);
      }

      removeApplicationDraft(applicationRouteSlug);
      setApplicationStatus('SUBMITTED');

      if (isEditMode) {
        navigate('/application/status');
        return;
      }

      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      setFormMessage(getApiErrorMessage(error));
    } finally {
      setIsSubmittingForm(false);
    }
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

      {formMessage ? (
        <p className={styles.formMessage} role="status">
          {formMessage}
        </p>
      ) : null}

      {isDraftSavedModalOpen ? (
        <Modal
          ariaLabel="지원서 임시저장 완료"
          role="alertdialog"
          title={<span>임시저장되었습니다.</span>}
          onClose={() => setIsDraftSavedModalOpen(false)}
        />
      ) : null}

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
              <FormButton
                variant="secondary"
                disabled={isSavingDraft || isSubmittingForm}
                onClick={handleSaveDraft}
              >
                {isSavingDraft ? '저장 중' : '임시저장'}
              </FormButton>
            )
          }
          right={
            <div className={styles.actionGroup}>
              <FormButton
                variant="dark"
                disabled={isFirstStep || isSavingDraft || isSubmittingForm}
                onClick={handlePrevious}
              >
                이전으로
              </FormButton>
              <FormButton
                variant={isLastStep ? 'primary' : 'dark'}
                disabled={isSavingDraft || isSubmittingForm}
                onClick={handleNext}
              >
                {isSubmittingForm
                  ? '제출 중'
                  : isLastStep
                    ? '제출하기'
                    : '다음으로'}
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

function getApiErrorMessage(error: unknown) {
  if (error instanceof ApiError) {
    return error.message;
  }

  return '요청 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
}

function getSelectedInterviewTimes(values: FormValues) {
  const interviewTimes = values.interviewTimes;

  return Array.isArray(interviewTimes) ? interviewTimes : [];
}

function withInterviewOptions(
  formSteps: ApplicationFormStep[],
  interviewOptions: ApplicationQuestionOption[],
) {
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
