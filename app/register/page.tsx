import { Metadata } from 'next';
import { AuthView } from '@/components/auth/AuthView';

export const metadata: Metadata = {
  title: 'Create Account — Krypton',
  description: 'Create your free Krypton account to start building Flutter & Dart apps directly in your browser with AI.',
};

export default function RegisterPage() {
  return <AuthView initialMode="register" />;
}
