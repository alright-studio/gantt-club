import path from 'path';
import fs from 'fs';

const ROOT_DIR = path.resolve(__dirname, '..');
const testDataFile = path.resolve(ROOT_DIR, 'data', 'test');

const processDataFile = () => {
	fs.readFile(testDataFile, (error, contents) => {
		if (error) throw error;

		document.body.innerHTML = contents;
	});
};

fs.watchFile(testDataFile, (current, previous) => {
	processDataFile();
});

processDataFile();