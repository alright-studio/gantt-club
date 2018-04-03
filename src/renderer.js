import React from 'react';
import ReactDOM from 'react-dom';
import loadTheme from 'utils/loadTheme';
import App from 'components/App';

const mountNode = document.getElementById('mount-node');

// Reset CSS
import './styles/reset.scss';

// Load Theme
loadTheme(window.DEFAULT_THEME);

// Render app
ReactDOM.render(<App />, mountNode);

// Live Reload
if (__DEV__) {
	if (module.hot) {
		module.hot.accept('components/App', () => {
			const App = require('components/App').default;
			ReactDOM.render(<App />, mountNode);
		});
	}
}
