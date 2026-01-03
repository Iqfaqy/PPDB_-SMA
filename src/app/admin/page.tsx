'use client';

import { useActionState } from 'react';
import { login } from '@/actions/auth';
import { Loader2 } from 'lucide-react';

const initialState = {
    success: false,
    message: '',
};

export default function AdminLogin() {
    const [state, formAction, isPending] = useActionState(login, initialState);

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Login</h1>
                    <p className="text-gray-500">Masuk untuk mengelola konten website</p>
                </div>

                <form action={formAction} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                        <input
                            name="username"
                            type="text"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            placeholder="Username"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                        <input
                            name="password"
                            type="password"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            placeholder="Password"
                        />
                    </div>

                    {state?.message && (
                        <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm font-medium text-center">
                            {state.message}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="animate-spin" size={20} />
                                Signing in...
                            </>
                        ) : (
                            'Sign In'
                        )}
                    </button>
                </form>
            </div>
        </main>
    );
}
