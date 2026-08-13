import type { ApplicationFormStep, ApplicationRouteSlug } from '@/types/application';

export const applicationFormSteps: ApplicationFormStep[] = [
  {
    id: 'personal',
    label: '인적사항',
    title: '섹션 1 : 인적 사항',
    description: '지원자님의 기본적인 인적 사항에 대해 질문합니다.',
    questions: [
      {
        id: 'studentId',
        label: '학번',
        type: 'text',
        required: true,
        placeholder: '학번을 입력해주세요. (예: 2412345)',
      },
      {
        id: 'phone',
        label: '전화번호',
        type: 'textarea',
        required: true,
        rows: 2,
        placeholder: '(예 : 010-0000-0000)\n**하이픈을 꼭 써 주세요',
      },
      {
        id: 'major',
        label: '전공',
        type: 'text',
        required: true,
        placeholder:
          '복수전공, 부전공 중일 경우 "주전공/복수(부)전공" 형식으로 입력해 주세요.',
      },
      {
        id: 'semester',
        label: '2026-1학기 이수학기',
        type: 'textarea',
        required: true,
        rows: 2,
        placeholder:
          '2026-1학기의 이수학기를 적어주세요.\n휴학생이신 경우 마지막으로 이수한 학기를 적어주세요. ex) 5학기',
      },
      {
        id: 'leaveOfAbsence',
        label: '2026-2학기 휴학 여부',
        type: 'checkbox',
        required: true,
        exclusive: true,
        options: [
          { id: 'planned', label: '네, 휴학 예정입니다.' },
          { id: 'not-planned', label: '아니요, 재학 예정입니다.' },
        ],
      },
    ],
  },
  {
    id: 'motivation',
    label: '자기소개와 지원동기',
    title: '섹션 2 : 자기소개와 지원 동기',
    description:
      'GDGoC에 지원하게 된 동기, 이루고 싶은 목표에 대한 생각 등을 작성해주세요.',
    questions: [
      {
        id: 'introduction',
        label: '자기소개 (300자 이상, 공백 포함)',
        type: 'textarea',
        required: true,
        placeholder:
          '지원자님이 어떤 분인지 알고 싶어요!\n자유롭게 본인을 가장 잘 표현할 수 있는 말들로 본인을 소개해 주세요.',
      },
      {
        id: 'motivation',
        label: '지원 동기 (300자 이상, 공백 포함)',
        type: 'textarea',
        required: true,
        placeholder:
          '어떤 마음으로 GDGoC Sookmyung에 지원하게 되었는지 알려주세요.',
      },
      {
        id: 'expectation',
        label:
          'GDGoC Sookmyung 활동을 통해 얻어가고자 하는 것은 무엇인가요? (300자 이상, 공백 포함)',
        type: 'textarea',
        required: true,
        placeholder:
          '다른 멤버들과의 교류, 기술 스터디, 프로젝트 경험 등 어떤 것이든 좋아요 :)\n기대하고 있는 활동이나 바라고 있는 경험을 자유롭게 적어주세요.',
      },
    ],
  },
  {
    id: 'experience',
    label: '개발 활동과 경험',
    title: '섹션 3 : 개발 활동과 경험',
    description: '개발 활동과 경험이 있다면 알려주세요.',
    questions: [
      {
        id: 'portfolio',
        label: 'Github 혹은 포트폴리오 링크',
        type: 'textarea',
        required: true,
        placeholder: 'ex) https://github.com/yeverycode',
      },
      {
        id: 'activities',
        label: '경력 혹은 활동사항이 있다면 적어주세요.',
        type: 'textarea',
        required: true,
        placeholder:
          '동아리, 학회, 스터디, 공모전, 외부 교육 등 어떤 경험이든 자유롭게 작성해 주세요!\n활동명과 함께 언제, 어떤 역할로 참여했는지 간단히 적어주시면 좋습니다.\n꼭 개발 관련 활동이 아니어도 괜찮습니다 :)\n* 없으면 없다고 답변하셔도 괜찮습니다! *',
      },
      {
        id: 'projectRole',
        label:
          '본인이 진행한 프로젝트와 그 안에서의 역할에 대해 이야기해 주세요. (300자 이상, 공백 포함)',
        type: 'textarea',
        required: true,
        placeholder:
          '직접 진행한 프로젝트, 해커톤 참여 경험, 스터디 등을 통해 무엇을 배우고 어떤 성장을 했는지 자유롭게 들려주세요.\n프로젝트 과정에서 겪었던 문제와 해결 방법, 느낀 점 등을 함께 적어주시면 더 좋아요!\n만약 팀 프로젝트 경험이 없다면 혼자 개발하거나 학습했던 경험도 괜찮습니다 :)\n(예: 인프런 강의 수강, Study Jam 참여 등)',
      },
      {
        id: 'studyField',
        label: 'GDGoC Sookmyung에서 함께 공부하고 싶은 분야가 있다면 알려주세요.',
        type: 'textarea',
        required: true,
        placeholder:
          '새롭게 공부하고 싶은 분야도 좋고, 이미 알고 있지만 심화된 내용을 학습하고 싶은 분야도 좋습니다.\nex) SpringBoot, ML, Android, Flutter 등',
      },
      {
        id: 'projectIdea',
        label:
          'GDGoC Sookmyung에서 진행하고 싶은 프로젝트 아이디어에 대해서 설명해 주세요.',
        type: 'textarea',
        required: true,
        placeholder:
          '함께 해보고 싶은 프로젝트 주제나 아이디어가 있다면 자유롭게 적어주세요!\n구체적인 기획이 아니어도 괜찮으며, 평소 만들고 싶었던 서비스나 관심 있는 분야를 공유해주셔도 좋습니다.\n아직 명확한 아이디어가 없다면 "어떤 방향의 프로젝트에 관심 있다" 정도로만 작성해주셔도 괜찮습니다 :)\n* 없으면 없다고 답변하셔도 괜찮습니다! *',
      },
      {
        id: 'techStack',
        label: '본인의 기술 스택과 활용 정도를 모두 적어주세요.',
        type: 'textarea',
        required: true,
        placeholder:
          '자주 사용하는 기술과 경험해본 기술을 나누어 적어주세요.\n각 기술을 어떤 프로젝트나 상황에서 사용했는지도 함께 작성해주시면 더 좋습니다.\n많지 않아도 괜찮으니 편하게 작성해주세요 :)\n* 없으면 없다고 답변하셔도 괜찮습니다! *',
      },
    ],
  },
  {
    id: 'gdgocActivity',
    label: 'GDGoC 활동 관련',
    title: '섹션 4 : GDGoC 활동 관련',
    description:
      'GDGoC Sookmyung의 Team Member로 선발된 후 본인이 진행 또는 운영할 수 있는 활동들에 대하여 질문합니다.',
    questions: [
      {
        id: 'teamMemberStudyField',
        label: 'GDGoC Sookmyung에서 본인이 주도적으로 이끌 수 있는 스터디 분야를 알려주세요.',
        type: 'textarea',
        required: true,
        placeholder: 'ex) React.js, ML, Flutter, Android, Spring 등',
      },
      {
        id: 'teamMemberRoles',
        label:
          'Team Member는 Organizer와 함께 GDGoC Sookmyung의 여러 행사들을 기획하고 진행합니다.\n다음의 항목 중에서 본인이 맡을 수 있는 역할을 1개 이상 선택해 주세요.',
        type: 'checkbox',
        required: true,
        options: [
          {
            id: 'study-lead',
            label: '기술/CS 스터디 리드(React, Spring, ML, Flutter, 알고리즘 등)',
          },
          { id: 'event-operation', label: '해커톤, 이벤트 기획, 운영' },
          { id: 'project-mentor', label: '프로젝트 멘토' },
        ],
      },
      {
        id: 'teamMemberEventIdea',
        label: 'GDGoC Sookmyung에서 진행했으면 하는 행사나 대회가 있다면 적어주세요. (선택)',
        type: 'textarea',
        required: false,
        placeholder: '마땅한 것이 생각이 나지 않는다면 이 질문은 넘어가셔도 좋습니다.',
      },
    ],
  },
  {
    id: 'interview',
    label: '면접 일정',
    title: '섹션 4 : 면접 일정',
    description:
      '면접은 08/29 (금) ~ 09/03 (수) 사이에 온라인으로 진행될 예정입니다.\n면접 가능 시간대에 모두 체크 해주세요.',
    questions: [
      {
        id: 'interviewTimes',
        label: '면접이 가능한 시간대에 모두 체크해주세요.',
        type: 'checkbox',
        required: true,
      },
      {
        id: 'participation',
        label:
          'GDGoC 활동은 2026년 9월부터 2027년 6월까지 진행됩니다.\n성실하게 참여해주실 수 있나요?',
        type: 'checkbox',
        required: true,
        options: [{ id: 'yes', label: '네, 참여 가능합니다.' }],
      },
      {
        id: 'finalCheck',
        label:
          '작성하시느라 수고 많으셨습니다!\n마지막으로 본인의 답변 (특히 인적사항, 전화번호) 에 오탈자가 없는지 한 번만 더 확인 부탁드립니다 😊',
        type: 'checkbox',
        required: true,
        options: [{ id: 'checked', label: '확인했습니다!' }],
      },
    ],
  },
];

const teamMemberMotivationStep: ApplicationFormStep = {
  id: 'motivation',
  label: '자기소개와 지원동기',
  title: '섹션 2 : 자기소개와 지원 동기',
  description:
    'GDGoC에 지원하게 된 동기, 이루고 싶은 목표에 대한 생각 등을 작성해주세요.',
  questions: [
    {
      id: 'introduction',
      label: '자기소개 (300자 이상, 공백 포함)',
      type: 'textarea',
      required: true,
      placeholder:
        '지원자님이 어떤 분인지 알고 싶어요!\n자유롭게 본인을 가장 잘 표현할 수 있는 말들로 본인을 소개해 주세요.',
    },
    {
      id: 'motivation',
      label: '지원 동기 (300자 이상, 공백 포함)',
      type: 'textarea',
      required: true,
      placeholder:
        '어떤 마음으로 GDGoC Sookmyung에 지원하게 되었는지 알려주세요.',
    },
    {
      id: 'communityPerspective',
      label:
        '숙명여대 내에 개발자 커뮤니티가 왜 필요하고, 어떤 의미를 가지는지 본인의 생각을 적어주세요.\n(300자 이상, 공백 포함)',
      type: 'textarea',
      required: true,
      placeholder:
        '숙명여대 안에서 개발자 커뮤니티가 어떤 역할을 할 수 있을지,\n또 본인에게는 어떤 의미로 다가오는지에 대한 생각을 자유롭게 들려주세요.',
    },
    {
      id: 'expectation',
      label:
        'GDGoC Sookmyung 활동을 통해 얻어가고자 하는 것은 무엇인가요? (300자 이상, 공백 포함)',
      type: 'textarea',
      required: true,
      placeholder:
        '다른 멤버들과의 교류, 기술 스터디, 프로젝트 경험 등 어떤 것이든 좋아요 :)\n기대하고 있는 활동이나 바라고 있는 경험을 자유롭게 적어주세요.',
    },
  ],
};

const teamMemberExperienceStep: ApplicationFormStep = {
  id: 'experience',
  label: '개발 활동과 경험',
  title: '섹션 3 : 개발 활동과 경험',
  description:
    'Team Member는 프로젝트 경험과 노하우를 바탕으로 Member들의 성장을 돕습니다.\n본인의 기술적 강점과 경험을 어떻게 공유할 수 있을지 작성해 주세요.',
  questions: [
    {
      id: 'portfolio',
      label: 'Github 혹은 포트폴리오 링크',
      type: 'textarea',
      required: true,
      placeholder: 'ex) https://github.com/yeverycode',
    },
    {
      id: 'projectRole',
      label: '본인이 진행한 프로젝트에 대해 이야기해 주세요. (300자 이상, 공백 포함)',
      type: 'textarea',
      required: true,
      placeholder:
        '프로젝트를 진행한 경험, 스터디나 해커톤에 참여한 경험 등에 대하여 그 경험을 통해 무엇을 얻었는지,\n어떤 문제를 만났으며 어떻게 해결했는지 알려주세요.',
    },
    {
      id: 'activities',
      label:
        '프로젝트나 스터디를 이끌었던 경험, 혹은 개발 커뮤니티에 참가(운영)했던 경험이 있다면 알려주세요.\n(300자 이상, 공백 포함)',
      type: 'textarea',
      required: true,
      placeholder:
        '새롭게 공부하고 싶은 분야도 좋고, 이미 알고 있지만 심화된 내용을 학습하고 싶은 분야도 좋습니다.\nex) SpringBoot, ML, Android, Flutter 등',
    },
    {
      id: 'techStack',
      label: '본인의 기술 스택을 알려 주세요.',
      type: 'textarea',
      required: true,
      placeholder:
        '가장 자신있는 기술의 이름 오른쪽에는 * 표시를 해주세요!\nex) React.js*, Angular.js, Spring, Android',
    },
  ],
};

const teamMemberInterviewStep: ApplicationFormStep = {
  id: 'interview',
  label: '면접 일정',
  title: '섹션 5 : 면접 일정',
  description:
    '면접은 08/21 (금) ~ 08/23 (일) 사이에 온라인으로 진행될 예정입니다.\n면접 가능 시간대에 모두 체크 해주세요.',
  questions: [
    {
      id: 'interviewTimes',
      label: '면접이 가능한 시간대에 모두 체크해주세요.',
      type: 'checkbox',
      required: true,
    },
    {
      id: 'participation',
      label:
        'GDGoC 활동은 2026년 9월부터 2027년 6월까지 진행됩니다.\n성실하게 참여해주실 수 있나요?',
      type: 'checkbox',
      required: true,
      options: [{ id: 'yes', label: '네, 참여 가능합니다.' }],
    },
    {
      id: 'finalCheck',
      label:
        '작성하시느라 수고 많으셨습니다!\n마지막으로 본인의 답변 (특히 인적사항, 전화번호) 에 오탈자가 없는지 한 번만 더 확인 부탁드립니다 😊',
      type: 'checkbox',
      required: true,
      options: [{ id: 'checked', label: '확인했습니다!' }],
    },
  ],
};

export function getApplicationFormSteps(applicationType: ApplicationRouteSlug) {
  if (applicationType === 'team-member') {
    return applicationFormSteps.map((step) => {
      if (step.id === 'motivation') return teamMemberMotivationStep;
      if (step.id === 'experience') return teamMemberExperienceStep;
      if (step.id === 'interview') return teamMemberInterviewStep;
      return step;
    });
  }

  return applicationFormSteps.filter((step) => step.id !== 'gdgocActivity');
}
