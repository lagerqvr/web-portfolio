import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import { getContentUncached } from '@/lib/content';
import Editor from '@/components/admin/Editor';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  if (!(await isAuthenticated())) redirect('/admin/login');

  // Uncached: the editor must never load a stale document over a fresh save.
  const content = await getContentUncached();
  return <Editor initial={content} />;
}
