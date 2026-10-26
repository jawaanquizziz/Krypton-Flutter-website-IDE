import { Metadata } from 'next';
import { AuthView } from '@/components/auth/AuthView';

export const metadata: Metadata = {
  title: 'Sign In — Krypton',
  description: 'Sign in to your Krypton account to continue building Flutter & Dart apps in the cloud.',
};

export default function SignInPage() {
  return <AuthView initialMode="signin" />;
}
