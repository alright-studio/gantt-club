import {combineReducers} from 'redux';
import startOfYear from 'date-fns/start_of_year';
import endOfYear from 'date-fns/end_of_year';

//
// === Fake State ===
//

const fakeMinState = {1: startOfYear(new Date())};
const fakeMaxState = {1: endOfYear(new Date())};
const fakeGroupState = {
	1: {
		id: 1,
		name: 'Porter Ecommerce',
	},
	2: {
		id: 2,
		name: 'Factory Rebrand',
	}
};
const fakeGroupByWorkspace = {
	1: [1, 2]
};
const fakeProjects = {
	1: {
		id: 1,
		groupId: 1,
		statusId: 12345,
		name: 'Brand Design',
	},
	2: {
		id: 2,
		groupId: 1,
		statusId: 12345,
		name: 'Website',
	}
};
const projectIds = {
	1: [1, 2]
};

//
// === Reducers ===
//

const minVisibleDateByWorkspaceId = (state = fakeMinState, action) => {
	switch (action.type) {
		default: {
			return state;
		}
	}
};


const maxVisibleDateByWorkspaceId = (state = fakeMaxState, action) => {
	switch (action.type) {
		default: {
			return state;
		}
	}
};

const groupsById = (state = fakeGroupState, action) => {
	switch (action.type) {
		default: {
			return state;
		}
	}
};

const groupIdsByWorkspaceId = (state = fakeGroupByWorkspace, action) => {
	switch (action.type) {
		default: {
			return state;
		}
	}
};

const projectsById = (state = fakeProjects, action) => {
	switch (action.type) {
		default: {
			return state;
		}
	}
};

const projectsIdsByGroupId = (state = projectIds, action) => {
	switch (action.type) {
		default: {
			return state;
		}
	}
};

export default combineReducers({
	minVisibleDateByWorkspaceId,
	maxVisibleDateByWorkspaceId,
	groupsById,
	groupIdsByWorkspaceId,
	projectsById,
	projectsIdsByGroupId
});

//
// === Selectors ===
//

const getGroupsByWorkspaceId = (state, workspaceId) => {
	const workspaceIds = state.groupIdsByWorkspaceId[workspaceId];

	if (!workspaceIds) return [];

	return workspaceIds.map(id => state.groupsById[id]);
};

const getProjectsByGroupId = (state, groupId) => {
	const projectIds = state.projectsIdsByGroupId[groupId];

	if (!projectIds) return [];

	return projectIds.map(id => state.projectsById[id]);
};

export const selectors = {
	getGroupsByWorkspaceId,
	getProjectsByGroupId
};