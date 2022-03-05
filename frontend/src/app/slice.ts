import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios, { AxiosError } from "axios"
import { RootState } from "./store"
import { LoginInput, UserDetails } from "../components/types/types"

export interface Data {
	data: UserDetails
	message: string
}

interface UserErrors {
	message: string
}

export const login = createAsyncThunk<Data, LoginInput, { rejectValue: UserErrors }>(
	"users/login",
	async (input, { rejectWithValue }) => {
		try {
			const config = {
				headers: { "Content-Type": "application/json" },
			}

			const { data } = await axios.post("http://localhost:5000/api/auth/login", input, config)
			return data
		} catch (err: any) {
			const error: AxiosError<UserErrors> = err
			if (!error.response) {
				throw err
			}
			return rejectWithValue(error.response.data)
		}
	}
)

export const signup = createAsyncThunk<Data, FormData, { rejectValue: UserErrors }>(
	"users/signup",
	async (input, { rejectWithValue }) => {
		try {
			const config = {
				headers: { "Content-Type": "multipart/form-data" },
			}

			const { data } = await axios.post(
				"http://localhost:5000/api/auth/register",
				input,
				config
			)

			return data
		} catch (error: any) {
			let err: AxiosError<UserErrors> = error
			if (!err.response) {
				throw error
			}

			return rejectWithValue(err.response.data)
		}
	}
)

export const updateDetails = createAsyncThunk<Data, FormData, { rejectValue: UserErrors }>(
	"users/update",
	async (input, { getState, rejectWithValue }) => {
		try {
			const config = { headers: { "Content-Type": "multipart/form-data", authorization: "" } }
			const state = getState() as RootState
			const user = state.User.user
			if (user) {
				config.headers.authorization = `Bearer ${user.token}`
			}

			const { data } = await axios.post("http://localhost:5000/api/auth/user", input, config)
			return data
		} catch (error: any) {
			let err: AxiosError<UserErrors> = error
			if (!err.response) {
				throw error
			}
			return rejectWithValue(err.response.data)
		}
	}
)

export interface UserTypes {
	loading: boolean
	error: string
	user: UserDetails | undefined
	message: string
}

const initialState: UserTypes = {
	loading: false,
	error: "",
	user: undefined,
	message: "",
}

const userSlice = createSlice({
	initialState,
	name: "user",
	reducers: {
		clearMessage(state) {
			state.message = ""
			state.error = ""
		},
		logout(state) {
			state.user = undefined
		},
	},
	extraReducers: (build) => {
		build.addCase(login.pending, (state) => {
			state.loading = true
		})
		build.addCase(login.fulfilled, (state, { payload }) => {
			state.user = payload.data
			state.message = payload.message
			state.loading = false
		})
		build.addCase(login.rejected, (state, action) => {
			state.loading = false
			if (action.payload) {
				state.error = action.payload.message
			} else {
				state.error = action.error.message!
			}
		})
		build.addCase(signup.pending, (state) => {
			state.loading = true
		})
		build.addCase(signup.fulfilled, (state, { payload }) => {
			state.loading = false
			state.message = payload.message
			state.user = payload.data
		})
		build.addCase(signup.rejected, (state, { payload, error }) => {
			state.loading = false
			if (payload) {
				state.error = payload.message
			} else {
				state.error = error.message!
			}
		})
		build.addCase(updateDetails.pending, (state) => {
			state.loading = true
		})
		build.addCase(updateDetails.fulfilled, (state, { payload }) => {
			state.loading = false
			state.message = payload.message
			state.user = payload.data
		})
	},
})

export default userSlice.reducer
export const { clearMessage, logout } = userSlice.actions
