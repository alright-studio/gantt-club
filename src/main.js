import electron from 'electron';
import path from 'path';
import url from 'url';

const {app, BrowserWindow} = electron;
const mainAppTemplate = path.resolve(__dirname, 'templates', 'index.html');

// Cache instance of browser window
let mainWindow;

const createWindow = () => {
	mainWindow = new BrowserWindow({width: 800, height: 600});

	mainWindow.loadURL(url.format({
		pathname: mainAppTemplate,
		protocol: 'file:',
		slashes: true
	}));

	mainWindow.on('closed', () => {
		mainWindow = null;
	});
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (mainWindow === null) {
		createWindow();
	}
});