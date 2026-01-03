'use server';

import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';

const DATA_DIR = path.join(process.cwd(), 'src/data');
const CONTENT_FILE = path.join(DATA_DIR, 'content.json');
const TEACHERS_FILE = path.join(DATA_DIR, 'teachers.json');
const SCHEDULES_FILE = path.join(DATA_DIR, 'schedules.json');
const FACILITIES_FILE = path.join(DATA_DIR, 'facilities.json');
const CONTACT_FILE = path.join(DATA_DIR, 'contact.json');
const PPDB_FILE = path.join(DATA_DIR, 'ppdb_settings.json');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const APPLICATIONS_FILE = path.join(DATA_DIR, 'applications.json');

// --- Helper Functions ---
async function readJson(filePath: string) {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        if ((error as any).code === 'ENOENT') return null; // File doesn't exist
        console.error(`Error reading ${filePath}:`, error);
        return null;
    }
}

async function writeJson(filePath: string, data: any) {
    try {
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
        return true;
    } catch (error) {
        console.error(`Error writing ${filePath}:`, error);
        return false;
    }
}

// --- Content Actions ---
export async function getContent() { return await readJson(CONTENT_FILE); }
export async function updateContent(newContent: any) {
    const success = await writeJson(CONTENT_FILE, newContent);
    if (success) { revalidatePath('/'); revalidatePath('/profil'); }
    return success;
}

// --- Teacher Actions ---
export async function getTeachers() { return await readJson(TEACHERS_FILE); }
export async function saveTeacher(teacherData: any) {
    const teachers = await getTeachers() || [];
    if (teacherData.id) {
        const index = teachers.findIndex((t: any) => t.id === teacherData.id);
        if (index !== -1) teachers[index] = { ...teachers[index], ...teacherData };
    } else {
        teachers.push({ ...teacherData, id: Math.random().toString(36).substr(2, 9) });
    }
    const success = await writeJson(TEACHERS_FILE, teachers);
    if (success) revalidatePath('/guru');
    return success;
}
export async function deleteTeacher(id: string) {
    let teachers = await getTeachers() || [];
    teachers = teachers.filter((t: any) => t.id !== id);
    const success = await writeJson(TEACHERS_FILE, teachers);
    if (success) revalidatePath('/guru');
    return success;
}

// --- Schedule Actions ---
export async function getSchedules() { return await readJson(SCHEDULES_FILE); }
export async function saveSchedule(data: any) {
    const list = await getSchedules() || [];
    if (data.id) {
        const index = list.findIndex((s: any) => s.id === data.id);
        if (index !== -1) list[index] = { ...list[index], ...data };
    } else {
        list.push({ ...data, id: Math.random().toString(36).substr(2, 9) });
    }
    return await writeJson(SCHEDULES_FILE, list);
}
export async function deleteSchedule(id: string) {
    let list = await getSchedules() || [];
    list = list.filter((s: any) => s.id !== id);
    return await writeJson(SCHEDULES_FILE, list);
}

// --- Facilities Actions ---
export async function getFacilities() { return await readJson(FACILITIES_FILE); }
export async function saveFacility(data: any) {
    const list = await getFacilities() || [];
    if (data.id) {
        const index = list.findIndex((x: any) => x.id === data.id);
        if (index !== -1) list[index] = { ...list[index], ...data };
    } else {
        list.push({ ...data, id: Math.random().toString(36).substr(2, 9) });
    }
    const success = await writeJson(FACILITIES_FILE, list);
    if (success) revalidatePath('/fasilitas');
    return success;
}
export async function deleteFacility(id: string) {
    let list = await getFacilities() || [];
    list = list.filter((x: any) => x.id !== id);
    const success = await writeJson(FACILITIES_FILE, list);
    if (success) revalidatePath('/fasilitas');
    return success;
}

// --- Contact Actions ---
export async function getContact() { return await readJson(CONTACT_FILE); }
export async function updateContact(data: any) {
    const success = await writeJson(CONTACT_FILE, data);
    if (success) revalidatePath('/kontak');
    return success;
}

// --- PPDB Actions ---
export async function getPPBSettings() { return await readJson(PPDB_FILE); }
export async function updatePPDBSettings(data: any) {
    const success = await writeJson(PPDB_FILE, data);
    if (success) revalidatePath('/ppdb');
    return success;
}

// --- User Actions (Create Only, Read is in auth) ---
export async function getUsers() { return await readJson(USERS_FILE); }
export async function saveUser(user: any) {
    // Basic file-based saving, not for auth check
    const users = await getUsers() || [];
    users.push(user);
    return await writeJson(USERS_FILE, users);
}

// --- Applications Actions ---
export async function getApplications() { return await readJson(APPLICATIONS_FILE); }
export async function saveApplication(app: any) {
    const list = await getApplications() || [];
    const index = list.findIndex((a: any) => a.userId === app.userId);
    if (index !== -1) {
        list[index] = { ...list[index], ...app };
    } else {
        list.push(app);
    }
    return await writeJson(APPLICATIONS_FILE, list);
}
