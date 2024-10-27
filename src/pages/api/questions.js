import path from 'path';
import {promises as  fs} from 'fs';

export default async function handler(req, res) {
    const jsonFilePath = path.join(process.cwd(), 'public', 'questions.json');

    try {
        const fileContent = await fs.readFile(jsonFilePath, 'utf-8');

        const questions = JSON.parse(fileContent);

        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ error: 'Failed to load questions' });
    }
}