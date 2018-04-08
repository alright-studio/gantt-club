import {combineReducers} from 'redux';
import mapValues from 'lodash/mapValues';
import proxySelector from 'utils/proxySelector';
import workspaces from 'reducers/workspaces';
import projectGrid, {selectors as projectGridSelectors} from 'reducers/projectGrid';

export default combineReducers({
	workspaces,
	projectGrid
});

const proxyProjectGridSelectors = mapValues(projectGridSelectors, selector => (
	proxySelector(selector, 'projectGrid'))
);

export const selectors = {
	...proxyProjectGridSelectors
}; 