import { createBrowserRouter, redirect } from 'react-router-dom';

import { RootLayout } from '@/components/layout/RootLayout';
import { AboutPage } from '@/pages/AboutPage/AboutPage';
import { ActivitiesPage } from '@/pages/ActivitiesPage/ActivitiesPage';
import { applicationTypeOptions } from '@/pages/ApplicationPage/applicationData';
import { getRecruitmentWindowStatus } from '@/pages/ApplicationPage/applicationUtils';
import { ApplicationFormPage } from '@/pages/ApplicationPage/ApplicationFormPage';
import { ApplicationPage } from '@/pages/ApplicationPage/ApplicationPage';
import { ApplicationStatusPage } from '@/pages/ApplicationStatusPage/ApplicationStatusPage';
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

          if (!applicationOption) {
            return redirect('/application');
          }

          const url = new URL(request.url);
          const isPreviewMode = url.searchParams.get('mode') === 'preview';

          if (isPreviewMode) {
            return null;
          }

          if (getRecruitmentWindowStatus(applicationOption) !== 'open') {
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
