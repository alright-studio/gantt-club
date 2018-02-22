require('dotenv').config();

const electron = require('electron');
const path = require('path');
const url = require('url');

const DEV = process.env.NODE_ENV === 'development';
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const appTemplateName = DEV ? 'index.dev.html' : 'index.prod.html';
const mainAppTemplate = path.resolve(__dirname, 'templates', appTemplateName);

// Cache instance of browser window
let mainWindow;

const createWindow = () => {
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		titleBarStyle: 'hiddenInset',
		backgroundColor: '#efefef'
	});

	mainWindow.loadURL(url.format({
		pathname: mainAppTemplate,
		protocol: 'file:',
		slashes: true,
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