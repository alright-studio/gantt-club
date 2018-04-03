const DISPATCH_THRESHOLD = 1000 / 60;

export default store => next => action => {
	const start = performance.now();
	const result = next(action);
	const end = performance.now();
	const dispatchTime = end - start;
	const isPerformanceBottleneck = dispatchTime >= DISPATCH_THRESHOLD;
	
	console.log(`${isPerformanceBottleneck ? '🚨' : '✨'} Dispatch [${action.type}] took ${(dispatchTime).toFixed(2)}ms`);
	
	return result;
};