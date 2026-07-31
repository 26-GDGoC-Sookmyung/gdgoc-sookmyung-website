import { createBrowserRouter, redirect } from 'react-router-dom';

import { RootLayout } from '@/components/layout/RootLayout';
import { AccountPage } from '@/pages/AccountPage/AccountPage';
import { AboutPage } from '@/pages/AboutPage/AboutPage';
import { ActivitiesPage } from '@/pages/ActivitiesPage/ActivitiesPage';
import { applicationTypeOptions } from '@/pages/ApplicationPage/applicationData';
import { getRecruitmentWindowStatus } from '@/pages/ApplicationPage/applicationUtils';
import { ApplicationFormPage } from '@/pages/ApplicationPage/ApplicationFormPage';
import { ApplicationPage } from '@/pages/ApplicationPage/ApplicationPage';
import { HomePage } from '@/pages/HomePage/HomePage';
import { LoginPage } from '@/pages/LoginPage/LoginPage';
import { MembersPage } from '@/pages/MembersPage/MembersPage';
import { NotFoundPage } from '@/pages/NotFoundPage/NotFoundPage';
import { RecruitPage } from '@/pages/RecruitPage/RecruitPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'activities',
        element: <ActivitiesPage />,
      },
      {
        path: 'members',
        element: <MembersPage />,
      },
      {
        path: 'recruit',
        element: <RecruitPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'forgot-password',
        element: (
          <AccountPage
            description="가입한 계정의 비밀번호를 찾을 수 있습니다."
            title="비밀번호 찾기"
          />
        ),
      },
      {
        path: 'signup',
        element: (
          <AccountPage
            description="지원서 작성을 위한 계정을 만들 수 있습니다."
            title="회원가입"
          />
        ),
      },
      {
        path: 'application',
        element: <ApplicationPage />,
      },
      {
        path: 'application/:applicationType',
        element: <ApplicationFormPage />,
        loader: ({ params }) => {
          const applicationOption = applicationTypeOptions.find(
            (option) => option.id === params.applicationType,
          );

          if (
            !applicationOption ||
            getRecruitmentWindowStatus(applicationOption) !== 'open'
          ) {
            return redirect('/application');
          }

          return null;
        },
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
