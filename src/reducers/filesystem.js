import {GANTT_VIEW_TYPES} from 'utils/constants';

const ganttFileFormat = {
	preferences: {
		maxHoursPerDay: 8,
	},
	contributor: [
		{
			id: 12345,
			name: 'Hope DeRossett',
			preferences: {
				maxHoursPerDay: 6,
			},
		}
	],
	groups: [
		{
			id: 12345,
			name: 'Porter Ecommerce',
		}
	],
	projects: [
		{
			id: 12345,
			groupId: 12345,
			statusId: 12345,
			name: 'Brand Design',
		}
	],
	tasks: [
		{
			id: 12345,
			projectId: 12345,
			typeId: 12345,
			parentTaskId: 12345,
			name: 'Round 1',
			contributorIds: [
				12345,
				12345,
			],
			startDate: [2018, 3, 12],
			duration: 5
		}
	],
	taskTypes: [
		{
			id: 12345,
			name: 'Delivery',
			color: '#333'
		},
		{
			id: 12345,
			name: 'Design',
			color: '#000'
		}
	],
	statusTypes: [
		{
			id: 12345,
			name: 'Active',
		},
	],
	hours: [
		[
			12345, // projectId
			12345, // contributorId
			4, // hours
		]
	],
};

const sessionFileFormat = {
	filterByContributorIds: [],
	filterByStatusIds: [],
	filterByProjectIds: [],
	filterByDate: {
		startDate: [2018, 3, 12],
		endDate: [2018, 3, 12],
	},
	activeViewType: GANTT_VIEW_TYPES.timeline,
};