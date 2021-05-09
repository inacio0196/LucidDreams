export function login (user) {
  return {
		type: 'LOGIN',
		payload: {
			...user,
			logged: true,
		},
	}
}

export function logout () {
	return {
		type: 'LOGOUT',
		payload: {
			logged: false,
		},
	}
}