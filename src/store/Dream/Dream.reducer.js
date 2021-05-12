const INITIAL_STATE = {}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
		case 'REGISTER_DREAM_OF_TODAY':
			return action.payload
		default:
			return state
	}
}