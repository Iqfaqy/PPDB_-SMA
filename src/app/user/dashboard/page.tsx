
import { getUserSession } from '@/actions/auth';
import { getApplications } from '@/actions/content';
import { redirect } from 'next/navigation';
import DashboardClient from './DashboardClient';

export default async function UserDashboardPage() {
    const user = await getUserSession();

    if (!user) {
        redirect('/login');
    }

    const apps = await getApplications() || [];
    const myApp = apps.find((a: any) => a.userId === user.id) || { status: 'new', documents: [] };

    return <DashboardClient user={user} initialApplication={myApp} />;
}
