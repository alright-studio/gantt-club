export default theme => {
	const styleTag = document.getElementById('theme-config');

	const themeCSS = `
		:root {
			--layout-menu-bar-height: ${theme.layout.menuBarHeight}px;
			--layout-cell-size: ${theme.layout.cellSize}px;

			--color-background: ${theme.colors.background};
			--color-border: ${theme.colors.border};
			--color-text: ${theme.colors.text};
			--color-text-secondary: ${theme.colors.textSecondary};
			
			--font-family: ${theme.typography.fontFamily};
			--font-size: ${theme.typography.fontSize}px;
		}
	`;
	
	styleTag.innerHTML = themeCSS;
};