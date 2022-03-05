import React from "react"
import { useSearchParams } from "react-router-dom"
import { JobData } from "../types/types"
import Pagination from "../ui/Pagination"
import JobListItem from "./JobListItem"

interface JobListProps {
	data: JobData
}

const JobsList = ({ data }: JobListProps) => {
	const [searchParams] = useSearchParams()

	const search = searchParams.get("s")

	return (
		<div className="bg-white px-6 md:px-3 py-3 w-full md:w-[40%] h-full">
			<h3 className="text-xl font-bold capitalize">
				{search ? `${search} Jobs` : "Jobs all over"}
			</h3>
			<h4>{data?.totalJobs} results found</h4>
			<div className="pt-2 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-200">
				{data.data.map((job) => (
					<JobListItem key={job._id} job={job} />
				))}
			</div>
			{data && data.numPages > 1 && <Pagination pages={data?.numPages} />}
		</div>
	)
}

export default JobsList
