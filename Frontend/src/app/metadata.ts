import type { Metadata } from 'next';

const appName = 'EduConnect Africa';
const appDescription = 'Connecting Nigerian students with accredited university options across Africa. Find personalized university recommendations, qualification equivalency info, and education counseling.';

export const metadata: Metadata = {
  title: {
    default: appName,
    template: `%s | ${appName}`,
  },
  description: appDescription,
  keywords: [
    'African education',
    'Nigerian students',
    'university matching',
    'study abroad Africa',
    'education counseling',
    'qualification equivalency',
    'university admissions',
    'African scholarships'
  ],
  authors: [
    {
      name: 'EduConnect Africa',
    },
  ],
  creator: 'EduConnect Africa',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#111111' },
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://educonnect-africa.com',
    title: appName,
    description: appDescription,
    siteName: appName,
  },
  twitter: {
    card: 'summary_large_image',
    title: appName,
    description: appDescription,
    creator: '@educonnectafrica',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
};
