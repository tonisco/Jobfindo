import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { ApplicationTypes, JobInput, JobType } from "../components/types"
import { RootState } from "./store"

export const getJobsApi = createApi({
	reducerPath: "jobs",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:5000/api/jobs",
	}),
	endpoints: (builder) => ({
		getAllJobs: builder.query<JobType[], null>({
			query: () => "/",
			transformResponse: (data: { data: JobType[] }) => data.data,
		}),
	}),
})

export const getJobApi = createApi({
	reducerPath: "job",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/jobs" }),
	endpoints: (builder) => ({
		getJobById: builder.query<JobType, string | undefined>({
			query: (id) => `/${id}`,
			transformResponse: (data: { data: JobType }) => data.data,
		}),
		applyJob: builder.mutation<JobType, ApplicationTypes>({ query: (id) => `/${id}` }),
	}),
})

export const getCompanyJobsApi = createApi({
	reducerPath: "companyJob",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:5000/api/jobs/company",
		prepareHeaders(headers, getState) {
			const state = getState.getState() as RootState
			const token = state.User.user.token
			if (token) {
				headers.set("authorization", `Bearer ${token}3`)
			}
			headers.set("Content-Type", "application/json")
			return headers
		},
	}),
	endpoints: (builder) => ({
		companyJobs: builder.query<JobType[], null>({
			query: () => "/",
			transformResponse: (data: { data: JobType[] }) => data.data,
		}),
		companyJobsCreate: builder.mutation<{ message: string }, { input: JobInput }>({
			query: (input) => ({ url: "", method: "POST", body: input }),
			transformResponse: (data: { data: { message: string } }) => data.data,
		}),
		companyJobsEdit: builder.mutation<{ message: string }, { id: string; input: JobInput }>({
			query: (data) => ({ url: `/${data.id}`, method: "POST", body: data.input }),
			transformResponse: (data: { data: { message: string } }) => data.data,
		}),
		companyJobDelete: builder.mutation<{ message: string }, { id: string }>({
			query: (id) => ({
				url: `/${id}`,
				method: "DELETE",
			}),
		}),
	}),
})

export const { useGetAllJobsQuery } = getJobsApi
export const { useGetJobByIdQuery, useApplyJobMutation } = getJobApi
export const {
	useCompanyJobsQuery,
	useCompanyJobsCreateMutation,
	useCompanyJobDeleteMutation,
	useCompanyJobsEditMutation,
} = getCompanyJobsApi
