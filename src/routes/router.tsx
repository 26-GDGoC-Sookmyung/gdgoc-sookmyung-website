import { createBrowserRouter, redirect } from 'react-router-dom';

import { RootLayout } from '@/components/layout/RootLayout';
import { AboutPage } from '@/pages/AboutPage/AboutPage';
import { ActivitiesPage } from '@/pages/ActivitiesPage/ActivitiesPage';
import { applicationTypeOptions } from '@/pages/ApplicationPage/applicationData';
import { getRecruitmentWindowStatus } from '@/pages/ApplicationPage/applicationUtils';
import { ApplicationFormPage } from '@/pages/ApplicationPage/ApplicationFormPage';
import { ApplicationPage } from '@/pages/ApplicationPage/ApplicationPage';
import { ForgotPasswordPage } from '@/pages/ForgotPasswordPage/ForgotPasswordPage';
import { ApplicationStatusPage } from '@/pages/ApplicationStatusPage/ApplicationStatusPage';
import { HomePage } from '@/pages/HomePage/HomePage';
import { LoginPage } from '@/pages/LoginPage/LoginPage';
import { MembersPage } from '@/pages/MembersPage/MembersPage';
import { NotFoundPage } from '@/pages/NotFoundPage/NotFoundPage';
import { RecruitPage } from '@/pages/RecruitPage/RecruitPage';
import { SignupPage } from '@/pages/SignupPage/SignupPage';

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
        element: <ForgotPasswordPage />,
      },
      {
        path: 'signup',
        element: <SignupPage />,
      },
      {
        path: 'application',
        element: <ApplicationPage />,
      },
      {
        path: 'application/status',
        element: <ApplicationStatusPage />,
      },
      {
        path: 'application/:applicationType',
        element: <ApplicationFormPage />,
        loader: ({ params, request }) => {
          const applicationOption = applicationTypeOptions.find(
            (option) => option.id === params.applicationType,
          );
          const isPreviewMode =
            new URL(request.url).searchParams.get('mode') === 'preview';

          if (
            !applicationOption ||
            (!isPreviewMode &&
              getRecruitmentWindowStatus(applicationOption) !== 'open')
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
