import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Modal } from '@/components/common/Modal/Modal';
import type { ApplicationTypeOption } from '@/types/application';

import styles from './ApplicationPage.module.css';
import { applicationNoticeItems, applicationTypeOptions } from './applicationData';
import { hasApplicationDraft } from './applicationDraftStorage';
import { getRecruitmentWindowStatus } from './applicationUtils';
import { ApplicationTypeCard } from './components/ApplicationTypeCard';

type ModalState =
  | {
      type: 'start' | 'continue';
      option: ApplicationTypeOption;
    }
  | {
      type: 'unavailable';
    }
  | null;

export function ApplicationPage() {
  const navigate = useNavigate();
  const [modalState, setModalState] = useState<ModalState>(null);

  const handleSelect = (option: ApplicationTypeOption) => {
    const recruitmentStatus = getRecruitmentWindowStatus(option);

    if (recruitmentStatus !== 'open') {
      setModalState({ type: 'unavailable' });
      return;
    }

    setModalState({
      type: hasApplicationDraft(option.id) ? 'continue' : 'start',
      option,
    });
  };

  const handleMoveToForm = (option: ApplicationTypeOption) => {
    navigate(`/application/${option.id}`);
  };

  return (
    <section className={styles.applicationPage} aria-labelledby="application-title">
      <div className={styles.inner}>
        <div className={styles.heading}>
          <h1 className={styles.title} id="application-title">
            지원서 작성
          </h1>
          <p className={styles.description}>
            <span>
              Team Member와 Member의 차이는{' '}
              <Link className={styles.recruitLink} to="/recruit">
                RECRUIT 페이지
              </Link>
              를 참고해주세요.
            </span>
            <span>
              지원서는 공고 마감 및 서류 검토 전까지 홈페이지에서 수정 및 삭제가
              가능합니다.
            </span>
          </p>
        </div>

        <div className={styles.cardList}>
          {applicationTypeOptions.map((option) => (
            <ApplicationTypeCard
              option={option}
              onSelect={handleSelect}
              key={option.id}
            />
          ))}
        </div>

        <div className={styles.noticeBox}>
          <ul className={styles.noticeList}>
            {applicationNoticeItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {modalState?.type === 'start' ? (
        <Modal
          title={
            <>
              <span>{modalState.option.type}</span>
              <span>지원을 시작하시겠습니까?</span>
            </>
          }
          actionLabel="지원 시작하기"
          onAction={() => handleMoveToForm(modalState.option)}
          onClose={() => setModalState(null)}
        />
      ) : null}

      {modalState?.type === 'continue' ? (
        <Modal
          title={
            <>
              <span>작성중인 지원서가 있습니다.</span>
              <span>이어서 작성하시겠습니까?</span>
            </>
          }
          actionLabel="이어서 작성하기"
          onAction={() => handleMoveToForm(modalState.option)}
          onClose={() => setModalState(null)}
        />
      ) : null}

      {modalState?.type === 'unavailable' ? (
        <Modal
          title={<span>지금은 지원 기간이 아니에요.</span>}
          onClose={() => setModalState(null)}
        />
      ) : null}
    </section>
  );
}
