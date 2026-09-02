import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import LoginForm from '@/components/admin/LoginForm';

export default async function LoginPage() {
  if (await isAuthenticated()) redirect('/admin');

  return (
    <div className="mx-auto flex min-h-svh w-full max-w-sm flex-col justify-center px-5">
      <LoginForm />
    </div>
  );
}
