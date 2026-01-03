import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file received' }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const fileName = `${Date.now()}-${file.name.replace(/\s/g, '-')}`;
        const uploadDir = path.join(process.cwd(), 'public/uploads');

        // Ensure directory exists
        try {
            await fs.access(uploadDir);
        } catch {
            await fs.mkdir(uploadDir, { recursive: true });
        }

        await fs.writeFile(path.join(uploadDir, fileName), buffer);

        return NextResponse.json({
            success: true,
            url: `/uploads/${fileName}`
        });

    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}
