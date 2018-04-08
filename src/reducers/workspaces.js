import {combineReducers} from 'redux';

const FAKE_STATE = {
	1: {
		fileName: 'alright-studio.gantt'
	}
};

const workspaceById = (state = FAKE_STATE, action) => {
	switch (action.type) {
		default: {
			return state;
		}
	}
};

export default combineReducers({
	workspaceById
});