'use client';

import { useActionState } from 'react';
import { login, type ActionState } from '@/app/(admin)/admin/actions';
import { Mark } from '@/components/ui/Mark';

export default function LoginForm() {
  const [state, action, pending] = useActionState<ActionState, FormData>(login, {});

  return (
    <form action={action} className="space-y-6">
      <div className="flex items-center gap-3">
        <Mark size={20} className="text-text" />
        <span className="label text-text">
          Admin <span className="label-dim">— —</span>
        </span>
      </div>

      <div>
        <label htmlFor="password" className="label mb-2 block">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoFocus
          autoComplete="current-password"
          disabled={pending}
          className="field"
        />
      </div>

      {state.error ? (
        <p role="alert" className="label text-sodium">
          {state.error}
        </p>
      ) : null}

      <button type="submit" disabled={pending} className="pill w-full justify-center">
        {pending ? 'Verifying' : 'Sign in'}
      </button>
    </form>
  );
}
