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
			footerHeight,
			legendWidth
		} = this.state;

		return (
			<Layout>
				<Layout.Fixed
					className={styles.canvas}
					onWheel={this.onWheelHeader}>
					<div style={{
						marginLeft: legendWidth,
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
						marginLeft: legendWidth,
						background: 'blue',
						transform: `translate(${gridOffsetX}px, ${gridOffsetY}px)`}}>
						grid - {gridOffsetX}, {gridOffsetY}
					</div>
					<div style={{
						padding: 20,
						position: 'absolute',
						left: 0,
						top: gridOffsetY,
						width: legendWidth,
						background: 'teal'}}>
						legend
					</div>
				</Layout.Fluid>
				<Layout.Fixed
					className={styles.canvas}
					onWheel={this.onWheelFooter}
					style={{height: footerHeight}}>
					<div style={{
						padding: 20,
						marginLeft: legendWidth,
						background: 'red',
						height: footerHeight,
						transform: `translate(${gridOffsetX}px, ${footerOffsetY}px)`}}>
						footer - {gridOffsetX}, {footerOffsetY}
					</div>
					<div style={{
						padding: 20,
						position: 'absolute',
						left: 0,
						top: footerOffsetY,
						width: legendWidth,
						background: 'teal'}}>
						legend -footer
					</div>
				</Layout.Fixed>
			</Layout>
		);
	}
});