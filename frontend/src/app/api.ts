import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { JobData, JobInput, JobType } from "../components/types/types"
import { RootState } from "./store"

const baseUrl =
    process.env.NODE_ENV === "production"
        ? "http://localhost:5000/api/jobs"
        : "/api/jobs"

export const getJobsApi = createApi({
    reducerPath: "jobs",
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getAllJobs: builder.query<
            JobData,
            { s?: string; page?: string } | undefined
        >({
            query: (input) => {
                const query = { s: "", page: "1" }
                if (input && input.page) query.page = input.page
                if (input && input.s) query.s = input.s
                const params = new URLSearchParams(query)
                return `?${params}`
            },
        }),
    }),
})

export const getJobApi = createApi({
    reducerPath: "job",
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getJobById: builder.query<JobType, string | undefined>({
            query: (id) => `/${id}`,
            transformResponse: (data: { data: JobType }) => data.data,
        }),
        applyJob: builder.mutation<
            { message: string },
            { data: FormData; id: string }
        >({
            query: (input) => ({
                url: `/apply/${input.id}`,
                method: "POST",
                body: input.data,
            }),
        }),
    }),
})

export const getCompanyJobsApi = createApi({
    reducerPath: "companyJobs",
    tagTypes: ["companyJobs"],
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl + "/company",
        prepareHeaders(headers, getState) {
            const state = getState.getState() as RootState
            const user = state.User.user
            if (user) {
                const token = user.token
                headers.set("authorization", `Bearer ${token}`)
            }
            headers.set("Content-Type", "application/json")
            return headers
        },
    }),
    endpoints: (builder) => ({
        companyJobs: builder.query<JobData, { page?: string }>({
            query: (input) => {
                let page = "1"
                if (input && input.page) page = input.page
                return { url: `/?page=${page}` }
            },
            providesTags: (result, err, arg) =>
                result
                    ? [
                          ...result.data.map(({ _id }) => ({
                              type: "companyJobs" as const,
                              id: _id,
                          })),
                          "companyJobs",
                      ]
                    : ["companyJobs"],
        }),
        companyJobsCreate: builder.mutation<
            { message: string },
            { input: JobInput }
        >({
            query: (input) => ({ url: "", method: "POST", body: input.input }),
            transformResponse: (data: { data: { message: string } }) =>
                data.data,
            invalidatesTags: ["companyJobs"],
        }),
        companyJobsEdit: builder.mutation<
            { message: string },
            { id: string; input: JobInput }
        >({
            query: (data) => ({
                url: `/${data.id}`,
                method: "POST",
                body: data.input,
            }),
            invalidatesTags: (result, err, arg) => [
                { type: "companyJobs", id: arg.id },
            ],
        }),
        companyJobDelete: builder.mutation<{ message: string }, { id: string }>(
            {
                query: (id) => ({
                    url: `/${id.id}`,
                    method: "DELETE",
                }),
                invalidatesTags: ["companyJobs"],
            }
        ),
    }),
})

export const getCompanyJobApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl + "/company",
        prepareHeaders: (headers, { getState }) => {
            const state = getState() as RootState
            const user = state.User.user
            if (user) {
                let token = user.token
                headers.set("authorization", `Bearer ${token}`)
            }
            return headers
        },
    }),
    reducerPath: "companyJob",
    endpoints: (builder) => ({
        companyJob: builder.query<JobType, string>({
            query: (id) => ({ url: `/${id}` }),
            transformResponse: (data: { data: JobType }) => data.data,
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
export const { useCompanyJobQuery } = getCompanyJobApi
