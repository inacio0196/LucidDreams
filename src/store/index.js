import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

// Reducers
import AuthenticateReducer from './Authenticate/Authenticate.reducer';
import DreamReducer from './Dream/Dream.reducer';

const rootReducer = combineReducers({
	authenticate: AuthenticateReducer,
	dream: DreamReducer,
})

const persistedReducer = persistReducer({
	key: 'root',
	storage: AsyncStorage,
}, rootReducer)

export const store = createStore(persistedReducer)
export const persistedStore = persistStore(store)

export default store;