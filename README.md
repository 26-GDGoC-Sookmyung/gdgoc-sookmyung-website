# gdgoc-sookmyung-website

Frontend repository for the official GDGoC Sookmyung website.

## 프로젝트 소개

GDGoC Sookmyung 공식 웹사이트 프론트엔드 프로젝트입니다. 현재는 기본
레이아웃, 라우팅, 공통 Header/Footer 구조를 중심으로 초기 설정되어 있습니다.

## 기술 스택

- React
- TypeScript
- Vite
- React Router DOM
- ESLint
- Prettier
- CSS Modules
- Node.js 20 이상
- npm

## 로컬 실행 방법

```bash
nvm use
npm install
npm run dev
```

개발 서버 실행 후 터미널에 표시되는 로컬 주소로 접속합니다.

## npm 명령어

- `npm run dev`: 개발 서버 실행
- `npm run build`: TypeScript 검사 및 프로덕션 빌드
- `npm run lint`: ESLint 검사
- `npm run preview`: 빌드 결과 미리보기
- `npm run format`: Prettier 자동 포맷
- `npm run format:check`: Prettier 포맷 검사

## 디렉터리 구조

```text
src/
├── assets/
│   ├── icons/
│   └── images/
├── components/
│   ├── common/
│   │   ├── Header/
│   │   └── Footer/
│   └── layout/
├── pages/
│   ├── HomePage/
│   └── NotFoundPage/
├── routes/
└── styles/
```

## 브랜치 전략 초안

- `main`: 배포 가능한 브랜치
- `develop`: 개발 통합 브랜치
- `feature/{기능명}`: 기능 개발 브랜치

## 커밋 메시지 예시

- `feat`: 새로운 기능 추가
- `fix`: 버그 수정
- `refactor`: 기능 변경 없는 코드 구조 개선
- `style`: 포맷팅, 스타일 코드 변경
- `docs`: 문서 수정
- `chore`: 빌드, 설정, 기타 작업
