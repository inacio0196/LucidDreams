import { REALITY_CHECKS } from '../../constants';
import firestore from '@react-native-firebase/firestore';

export function login (user) {
	firestore()
		.collection('today-reality-checks')
		.doc(user.userID)
		.collection('checks')
		.get()
		.then(snapshot => {
			if (snapshot.empty) {
				initializeUserRealityChecks(user.userID)
			}
		})
	
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

// Functions
function initializeUserRealityChecks (userID) {
	REALITY_CHECKS.forEach(async realityCheck => {
		await firestore()
			.collection('today-reality-checks')
			.doc(userID)
			.collection('checks')
			.add({
				title: realityCheck.title,
				description: realityCheck.description,
				status: realityCheck.status,
			})
	})
}