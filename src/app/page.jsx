// Home page - Redirects to dashboard or login
import { getSessionUser } from '@/lib/session'
import { redirect } from 'next/navigation'

export default async function HomePage() {
  // TODO: Get current user session
  // (Already implemented below)
  // TODO: Redirect to dashboard if authenticated, otherwise to login
  // (Already implemented below)
  console.log('Welcome to Business Case 2!');

  // Get current user session
  const user = await getSessionUser();

  // Redirect to dashboard if authenticated, otherwise to login
  if (user) {
    redirect('/dashboard');
  } else {
    redirect('/login');
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Welcome to Business Case 2!</h1>
    </div>
  );
}
