import React from "react"
import { JobType } from "../types"
import JobListItem from "./JobListItem"

interface JobListProps {
	data: JobType[]
}

const JobsList = ({ data }: JobListProps) => {
	return (
		<div className="bg-white p-3 w-[40%]">
			<h3 className="text-xl font-bold">Jobs all over</h3>
			<h4>{data?.length} results found</h4>
			<div className="pt-2 max-h-[77.6vh] overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-200">
				{data.map((job) => (
					<JobListItem key={job._id} job={job} />
				))}
			</div>
		</div>
	)
}

export default JobsList
