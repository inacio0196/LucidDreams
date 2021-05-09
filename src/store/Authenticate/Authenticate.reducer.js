const INITIAL_STATE = {
	logged: false,
}

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case 'LOGIN':
			return action.payload
		case 'LOGOUT':
			return action.payload
		default:
			return state
	}
}