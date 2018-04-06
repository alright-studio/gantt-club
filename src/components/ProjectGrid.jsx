import React from 'react';
import Layout from 'components/Layout';
import createClass from 'create-react-class';
import styles from './ProjectGrid.scss';

export default createClass({
	getInitialState() {
		return {
			gridOffsetX: 0,
			gridOffsetY: 0,
			footerOffsetY: 0,
			footerHeight: 100,
			legendWidth: 200,
		};
	},

	onWheelHeader(event) {
		this.setState({
			gridOffsetX: this.state.gridOffsetX - event.deltaX,
		});
	},

	onWheelGrid(event) {
		this.setState({
			gridOffsetX: this.state.gridOffsetX - event.deltaX,
			gridOffsetY: this.state.gridOffsetY - event.deltaY,
		});
	},

	onWheelFooter(event) {
		this.setState({
			gridOffsetX: this.state.gridOffsetX - event.deltaX,
			footerOffsetY: this.state.footerOffsetY - event.deltaY,
		});
	},
	
	render() {
		const {
			gridOffsetX,
			gridOffsetY,
			footerOffsetY,
			footerHeight
		} = this.state;

		return (
			<Layout>
				<Layout.Fixed
					className={styles.canvas}
					onWheel={this.onWheelHeader}>
					<div style={{
						padding: 20,
						background: 'green',
						transform: `translateX(${gridOffsetX}px)`}}>
						header - {gridOffsetX}
					</div>
				</Layout.Fixed>
				<Layout.Fluid
					className={styles.canvas}
					onWheel={this.onWheelGrid}>
					<div style={{
						padding: 20,
						background: 'blue',
						transform: `translate(${gridOffsetX}px, ${gridOffsetY}px)`}}>
						grid - {gridOffsetX}, {gridOffsetY}
					</div>
				</Layout.Fluid>
				<Layout.Fixed
					className={styles.canvas}
					onWheel={this.onWheelFooter}>
					<div style={{
						padding: 20,
						background: 'red',
						height: footerHeight,
						transform: `translate(${gridOffsetX}px, ${footerOffsetY}px)`}}>
						footer - {gridOffsetX}, {footerOffsetY}
					</div>
				</Layout.Fixed>
			</Layout>
		);
	}
});