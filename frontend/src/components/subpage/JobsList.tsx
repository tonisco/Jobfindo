import React from "react"
import JobListItem from "./JobListItem"

const JobsList = () => {
	return (
		<div className="bg-white p-3 w-[40%]">
			<h3 className="text-xl font-bold">Jobs all over</h3>
			<h4>10 results found</h4>
			<div className="pt-2 max-h-[77.6vh] overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-200">
				{[...new Array(6)].map((_, i) => (
					<JobListItem key={i} />
				))}
			</div>
		</div>
	)
}

export default JobsList
