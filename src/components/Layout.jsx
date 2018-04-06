import React from 'react';
import classNames from 'classnames';
import styles from './Layout.scss';

const Container = ({children, className, ...props}) =>  {
	const containerClassName = classNames(styles.container, className);
	
	return (
		<div
			{...props}
			className={containerClassName}>
			{children}
		</div>
	);
};

const Fixed = ({children, className, ...props}) =>  {
	const fixedClassName = classNames(styles.fixed, className);
	
	return (
		<div
			{...props}
			className={fixedClassName}>
			{children}
		</div>
	);
};

const Fluid = ({children, className, ...props}) => {
	const fixedClassName = classNames(styles.fluid, className);
	
	return (
		<div
			{...props}
			className={fixedClassName}>
			{children}
		</div>
	);
};


const Layout = Container;
Layout.Fixed = Fixed;
Layout.Fluid = Fluid;

export default Layout;