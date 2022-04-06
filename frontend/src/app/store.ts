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
import { getJobApi, getJobsApi, getCompanyJobsApi, getCompanyJobApi } from "./api"
import User from "./slice"

const persistConfig = {
	key: "root",
	storage,
}
const persistReducers = persistReducer(persistConfig, User)

const reducer = combineReducers({
	[getJobsApi.reducerPath]: getJobsApi.reducer,
	[getJobApi.reducerPath]: getJobApi.reducer,
	[getCompanyJobsApi.reducerPath]: getCompanyJobsApi.reducer,
	[getCompanyJobApi.reducerPath]: getCompanyJobApi.reducer,
	User: persistReducers,
})

export const store = configureStore({
	reducer,
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(
			getJobsApi.middleware,
			getJobApi.middleware,
			getCompanyJobsApi.middleware,
			getCompanyJobApi.middleware
		)
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
