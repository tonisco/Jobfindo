import { configureStore, ThunkAction, Action, combineReducers } from "@reduxjs/toolkit"
import {
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
	persistStore,
} from "redux-persist"
import storage from "redux-persist/lib/storage"
import counterReducer from "../features/counter/counterSlice"
import { getJobApi, getJobsApi, getCompanyJobsApi } from "./api"
import User from "./slice"

const persistConfig = {
	key: "root",
	storage,
}
const persistReducers = persistReducer(persistConfig, User)

const reducer = combineReducers({
	counter: counterReducer,
	[getJobsApi.reducerPath]: getJobsApi.reducer,
	[getJobApi.reducerPath]: getJobApi.reducer,
	[getCompanyJobsApi.reducerPath]: getCompanyJobsApi.reducer,
	User: persistReducers,
})

export const store = configureStore({
	reducer,
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(getJobsApi.middleware, getJobApi.middleware, getCompanyJobsApi.middleware)
	},
})

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>
