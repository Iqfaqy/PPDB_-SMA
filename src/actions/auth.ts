'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import fs from 'fs/promises';
import path from 'path';

// Helper to access users.json securely
const DATA_DIR = path.join(process.cwd(), 'src/data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

async function getUsers() {
    try {
        const data = await fs.readFile(USERS_FILE, 'utf-8');
        return JSON.parse(data);
    } catch {
        return [];
    }
}

export async function getUserSession() {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('user_session');

    if (!sessionCookie) return null;

    try {
        return JSON.parse(sessionCookie.value);
    } catch {
        return null;
    }
}

export async function login(prevState: any, formData: FormData) {
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;
    const role = formData.get('role') as string; // 'admin' or 'user'

    const cookieStore = await cookies();

    // Admin Login
    if (role === 'admin') {
        if (username === 'admin' && password === 'admin123') {
            cookieStore.set('admin_session', 'true', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24 * 7, // 1 week
                path: '/',
            });
            return { success: true, redirect: '/admin/dashboard' };
        }
        return { success: false, message: 'Invalid admin credentials' };
    }

    // User Login
    if (role === 'user') {
        const users = await getUsers();
        const user = users.find((u: any) => u.email === username && u.password === password);

        if (user) {
            cookieStore.set('user_session', JSON.stringify({ id: user.id, email: user.email, name: user.name }), {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24 * 7,
                path: '/',
            });
            return { success: true, redirect: '/user/dashboard' };
        }
        return { success: false, message: 'Email atau password salah' };
    }

    return { success: false, message: 'Invalid role' };
}

export async function register(prevState: any, formData: FormData) {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const users = await getUsers();

    // Check if email exists
    if (users.find((u: any) => u.email === email)) {
        return { success: false, message: 'Email sudah terdaftar' };
    }

    const newUser = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        email,
        password, // In production, hash this!
        createdAt: new Date().toISOString()
    };

    users.push(newUser);

    try {
        await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8');
        return { success: true, message: 'Registrasi berhasil! Silahkan login.' };
    } catch (e) {
        return { success: false, message: 'Gagal menyimpan data.' };
    }
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete('admin_session');
    cookieStore.delete('user_session');
    redirect('/');
}
