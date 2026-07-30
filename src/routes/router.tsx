import { createBrowserRouter } from 'react-router-dom';

import { RootLayout } from '@/components/layout/RootLayout';
import { AboutPage } from '@/pages/AboutPage/AboutPage';
import { ActivitiesPage } from '@/pages/ActivitiesPage/ActivitiesPage';
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
        path: 'application',
        element: <ApplicationPage />,
      },
      {
        path: 'application/:applicationType',
        element: <ApplicationFormPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
