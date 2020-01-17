import createStore from 'unistore'
import http from "../helpers/api";

export let actions = store => ({
	increment(state) {
		return { count: state.count + 1 }
	},
	decrement(state) {
		return { count: state.count - 1 }
	},
	login(state, data) {
		return { user: data.user, token: data.token}
	},
	logout(state) {
		return { user: {}, token: null }
	},
});

export default initialState => createStore(initialState)