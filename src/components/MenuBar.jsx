import React from 'react';
import styles from './MenuBar.scss';

const MenuBar = ({children}) => (
	<div className={styles.menu}>
		{children}
	</div>
);

export default MenuBar;