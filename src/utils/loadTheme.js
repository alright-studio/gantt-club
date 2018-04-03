export default theme => {
	const styleTag = document.getElementById('theme-config');

	const themeCSS = `
		:root {
			--layout-menu-bar-height: ${theme.layout.menuBarHeight}px;

			--color-background: ${theme.colors.background};
			--color-border: ${theme.colors.border};
			--color-text: ${theme.colors.text};
			
			--font-family: ${theme.typography.fontFamily};
			--font-size: ${theme.typography.fontSize};
		}
	`;
	
	styleTag.innerHTML = themeCSS;
};