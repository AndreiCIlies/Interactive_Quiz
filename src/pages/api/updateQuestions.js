import { promises as fs } from 'fs';
import path from 'path';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const filePath = path.join(process.cwd(), 'public', 'questions.json');
        const newData = req.body;

        try {
            await fs.writeFile(filePath, JSON.stringify(newData, null, 2));
            res.status(200).json({ message: 'Questions updated successfully!' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to update questions.' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}