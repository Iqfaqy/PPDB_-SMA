'use client';

import { useActionState } from 'react';
import { register } from '@/actions/auth';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const initialState = {
    success: false,
    message: '',
};

export default function RegisterPage() {
    const [state, formAction, isPending] = useActionState(register, initialState);
    const router = useRouter();

    useEffect(() => {
        if (state.success) {
            // If successful, wait 2s then redirect to login
            const t = setTimeout(() => router.push('/login'), 2000);
            return () => clearTimeout(t);
        }
    }, [state.success, router]);

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Daftar Akun Baru</h1>
                    <p className="text-gray-500">Buat akun untuk memulai pendaftaran PPDB</p>
                </div>

                <form action={formAction} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                        <input
                            name="name"
                            type="text"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            placeholder="Nama Santri"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                            name="email"
                            type="email"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            placeholder="nama@email.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                        <input
                            name="password"
                            type="password"
                            required
                            minLength={6}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            placeholder="••••••••"
                        />
                    </div>

                    {state?.message && (
                        <div className={`p-3 rounded-lg text-sm font-medium text-center ${state.success ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
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
                                Mendaftar...
                            </>
                        ) : (
                            'Daftar Sekarang'
                        )}
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-600">
                    Sudah punya akun? <Link href="/login" className="text-blue-600 font-bold hover:underline">Login disini</Link>
                </p>
            </div>
        </main>
    );
}
