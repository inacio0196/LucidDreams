import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

// Reducers
import AuthenticateReducer from './Authenticate/Authenticate.reducer';

const rootReducer = combineReducers({
	authenticate: AuthenticateReducer,
})

const persistedReducer = persistReducer({
	key: 'root',
	storage: AsyncStorage,
}, rootReducer)

export const store = createStore(persistedReducer)
export const persistedStore = persistStore(store)

export default store;