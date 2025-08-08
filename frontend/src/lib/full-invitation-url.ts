import { NEXT_PUBLIC_URL } from '@/env';

export default function fullInvitationUrl(token: string) {
  return `${NEXT_PUBLIC_URL}/invitation?token=${token}`;
}
