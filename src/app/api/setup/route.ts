import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { username, ventures } = body;

        if (!username && !ventures) {
            return NextResponse.json({ error: 'No data provided' }, { status: 400 });
        }

        const dataPath = path.join(process.cwd(), 'data.json');

        // Read existing JSON
        let currentData: any = {};
        try {
            const fileContent = fs.readFileSync(dataPath, 'utf8');
            currentData = JSON.parse(fileContent);
        } catch (e) {
            // If file missing or invalid, use default struct
            currentData = {};
        }

        // Update fields
        if (username) {
            currentData.githubUsername = username;
        }

        if (ventures && Array.isArray(ventures)) {
            currentData.ventures = ventures;
        }

        // Write back pretty-printed JSON
        fs.writeFileSync(dataPath, JSON.stringify(currentData, null, 4), 'utf8');

        return NextResponse.json({ success: true, message: 'Data updated successfully' });

    } catch (error) {
        console.error('Setup Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
