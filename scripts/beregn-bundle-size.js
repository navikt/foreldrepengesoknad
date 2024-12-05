import fs from 'fs';

const parseViteOutput = (filePath) => {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const lines = fileContent.split('\n');
    const result = [];

    for (const line of lines) {
        if (line.startsWith('dist')) {
            const parts = line.split(' ').filter(Boolean);
            result.push({
                name: parts[0],
                size: Number(parts[1].replace(',', '')),
            });
        }
    }

    return { name: 'Total Size', size: result.reduce((prev, info) => prev + info.size, 0) };
};

const outputPath = './build-output.log';
const size = parseViteOutput(outputPath);
console.log(JSON.stringify(size));
