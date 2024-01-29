import * as fs from 'fs';
require('dotenv').config();

export const readFileSync = (pathFile: string) => {
    try {
        const data = fs.readFileSync("src/storage/" + pathFile, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading or parsing the file:', error);
        return null;
    }
}

export const writeFileSync = (pathFile: string, content: any) => {
    try {
        return fs.writeFileSync(pathFile, content);
    } catch (error) {
        console.error('Error reading the file:', error);
        return null;
    }
}

export const readFilesInDirectory = () : string[] => {
    try {
        const files = fs.readdirSync('src/storage');
        return files.slice(0, Number.parseInt(process.env.LIMIT_WALLET?.trim()) || 2);
    } catch (error) {
        console.error('Error reading directory:', error);
        return [];
    }
}
