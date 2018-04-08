import React from 'react';
import Layout from 'components/Layout';
import classNames from 'classnames';
import createClass from 'create-react-class';
import styles from './WorkspaceGrid.scss';
import startOfYear from 'date-fns/start_of_year';
import endOfYear from 'date-fns/end_of_year';
import eachDay from 'date-fns/each_day';
import getMonth from 'date-fns/get_month';
import getDate from 'date-fns/get_date';
import groupBy from 'lodash/groupBy';
import map from 'lodash/map';
import filter from 'lodash/filter';
import {connect} from 'react-redux';
import {selectors} from 'reducers/app';

const ProjectGrid = createClass({
	getInitialState() {
		const today = new Date();

		return {
			gridOffsetX: 0,
			gridOffsetY: 0,
			footerOffsetY: 0,
			footerHeight: 100,
			legendWidth: 200,
			minVisibleDate: startOfYear(today),
			maxVisibleDate: endOfYear(today)
		};
	},

	getVisibleDays() {
		return eachDay(this.state.minVisibleDate, this.state.maxVisibleDate);
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
		// TODO: better scroll behavior (pick a direction to scroll based on delta magnitude)
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

		const headerClassName = classNames(styles.canvas, styles.header);

		return (
			<Layout>
				<Layout.Fixed
					style={{paddingLeft: legendWidth}}
					className={headerClassName}
					onWheel={this.onWheelHeader}>
					<div style={{transform: `translateX(${gridOffsetX - 1}px)`}}>
						{this.renderHeaderGrid()}
					</div>
				</Layout.Fixed>
				<Layout.Fluid
					style={{paddingLeft: legendWidth}}
					className={styles.canvas}
					onWheel={this.onWheelGrid}>
					<div style={{
						padding: 20,
						background: 'blue',
						transform: `translate(${gridOffsetX}px, ${gridOffsetY}px)`}}>
						grid - {gridOffsetX}, {gridOffsetY}
					</div>

					<div style={{
						position: 'absolute',
						left: 0,
						top: -1,
						transform: `translateY(${gridOffsetY}px)`,
						width: legendWidth}}>
						{this.renderProjectList()}
					</div>
				</Layout.Fluid>
				<Layout.Fixed
					className={styles.canvas}
					onWheel={this.onWheelFooter}
					style={{height: footerHeight, paddingLeft: legendWidth}}>
					<div style={{
						padding: 20,
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
	},

	renderHeaderGrid() {
		const days = this.getVisibleDays();
		const daysByMonth = groupBy(days, getMonth);
		const dateCellClassName = classNames(styles.cell, styles.dateCell);

		const monthCells = map(daysByMonth, monthDays => {
			const monthName = monthDays[0].toLocaleString('en-us', {month: 'long'});

			return (
				<td
					key={monthName}
					className={styles.cell}
					colSpan={monthDays.length}>
					{monthName}
				</td>
			);
		});

		const dayCells = map(days, day => (
			<td
				key={day}
				className={dateCellClassName}>
				{getDate(day) < 10 && '0'}{getDate(day)}
			</td>
		));

		return (
			<table className={styles.table}>
				<tbody>
					<tr>{monthCells}</tr>
					<tr>{dayCells}</tr>
				</tbody>
			</table>
		);
	},

	renderProjectList() {
		const {legendWidth} = this.state;
		const {groups, projects} = this.props;
		const projectCellClassName = classNames(styles.cell, styles.projectCell);

		const groupCells = groups.map(group => {
			const groupProjects = filter(projects, {groupId: group.id});

			return (
				<React.Fragment key={`group-${group.id}`}>
					<tr>
						<td
							style={{width: legendWidth}}
							className={projectCellClassName}>
							{group.name}
						</td>
					</tr>
					{groupProjects.map(project => (
						<tr key={project.id}>
							<td
								style={{width: legendWidth}}
								className={projectCellClassName}>
								{project.name}
							</td>
						</tr>
					))}
					<tr>
						<td
							style={{width: legendWidth}}
							className={projectCellClassName}>
							+ Add Project
						</td>
					</tr>
				</React.Fragment>
			);
		});

		const addGroupRow = (
			<tr>
				<td
					style={{width: legendWidth}}
					className={projectCellClassName}>
					+ Add Group
				</td>
			</tr>
		);

		return (
			<table className={styles.table}>
				<tbody>
					{groupCells}
					{addGroupRow}
				</tbody>
			</table>
		);
	}
});

const mapStateToProps = state => ({
	groups: selectors.getGroupsByWorkspaceId(state, 1),
	projects: selectors.getProjectsByGroupId(state, 1)
});

export default connect(mapStateToProps)(ProjectGrid);