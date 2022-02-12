import React from "react"
import { JobType } from "../types"
import JobListItem from "./JobListItem"

interface JobListProps {
	data: JobType[]
}

const JobsList = ({ data }: JobListProps) => {
	return (
		<div className="bg-white px-6 md:px-3 py-3 w-full md:w-[40%] h-full">
			<h3 className="text-xl font-bold">Jobs all over</h3>
			<h4>{data?.length} results found</h4>
			<div className="pt-2 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-200">
				{data.map((job) => (
					<JobListItem key={job._id} job={job} />
				))}
			</div>
		</div>
	)
}

export default JobsList
