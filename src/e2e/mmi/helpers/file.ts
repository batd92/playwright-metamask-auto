import * as fs from 'fs';
import path from 'path';
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

export const writeFileSync = (address: string, content: any, delFile: boolean) => {
    try {
        const pathFile = path.resolve(`src/storage/${address}.json`);
        if (delFile) {
            return fs.unlinkSync(pathFile);
        }
        return fs.writeFileSync(pathFile, content);
    } catch (error) {
        console.error('Error reading the file:', error);
        return null;
    }
}

export const readFilesInDirectory = (): string[] => {
    try {
        return fs.readdirSync('src/storage');
    } catch (error) {
        console.error('Error reading directory:', error);
        return [];
    }
}


export const getDay = (): string => {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');

    const formattedDate = `${year}${month}${day}`;
    return formattedDate;
}
