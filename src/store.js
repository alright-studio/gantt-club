import {createStore, applyMiddleware, compose} from 'redux';
import appReducer from 'reducers/app';
let performanceLogger;

if (__DEV__) {
	performanceLogger = require('middlewares/performanceLogger').default; // eslint-disable-line
}
export default initialState => {
	const middlewares = __DEV__ ? [
		performanceLogger,
	] : [];
	
	const store = createStore(
		appReducer,
		initialState,
		compose(applyMiddleware(...middlewares))
	);
	
	if (__DEV__) {
		if (module.hot) {
			module.hot.accept('reducers/app', () => {
				const nextReducer = require('reducers/app').default;
				store.replaceReducer(nextReducer);
			});
		}
	}

	return store;
};