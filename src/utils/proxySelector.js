export default (selector, stateKey) => (state, ...args) => {
	return selector(state[stateKey], ...args);
};