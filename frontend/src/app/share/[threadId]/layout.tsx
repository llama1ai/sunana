import { Metadata } from 'next';
import { getThread, getProject } from '@/lib/api-server';
import { NEXT_PUBLIC_URL, NODE_ENV, NEXT_PUBLIC_ENV_MODE } from '@/env';

export async function generateMetadata({ params }): Promise<Metadata> {
  const { threadId } = await params;
  const fallbackMetaData = {
    title: 'Shared Conversation | Kortix Suna',
    description: 'Replay this Agent conversation on Kortix Suna',
    alternates: {
      canonical: `${NEXT_PUBLIC_URL}/share/${threadId}`,
    },
    openGraph: {
      title: 'Shared Conversation | Kortix Suna',
      description: 'Replay this Agent conversation on Kortix Suna',
      images: [`${NEXT_PUBLIC_URL}/share-page/og-fallback.png`],
    },
  };

  try {
    const threadData = await getThread(threadId);
    const projectData = await getProject(threadData.project_id);

    if (!threadData || !projectData) {
      return fallbackMetaData;
    }

    const isDevelopment =
      NODE_ENV === 'development' ||
      NEXT_PUBLIC_ENV_MODE === 'LOCAL' ||
      NEXT_PUBLIC_ENV_MODE === 'local';

    const title = projectData.name || 'Shared Conversation | Kortix Suna';
    const description =
      projectData.description ||
      'Replay this Agent conversation on Kortix Suna';
    const ogImage = isDevelopment
      ? `${NEXT_PUBLIC_URL}/share-page/og-fallback.png`
      : `${NEXT_PUBLIC_URL}/api/share-page/og-image?title=${projectData.name}`;

    return {
      title,
      description,
      alternates: {
        canonical: `${NEXT_PUBLIC_URL}/share/${threadId}`,
      },
      openGraph: {
        title,
        description,
        images: [ogImage],
      },
      twitter: {
        title,
        description,
        images: ogImage,
        card: 'summary_large_image',
      },
    };
  } catch (error) {
    return fallbackMetaData;
  }
}

export default async function ThreadLayout({ children }) {
  return <>{children}</>;
}
