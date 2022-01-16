import React from "react"
import JobsList from "../components/subpage/JobsList"
import JobDetails from "../components/subpage/JobDetails"

const JobPage = () => {
	return (
		<div className="max-w-5xl mx-auto flex w-full">
			<JobsList />
			<JobDetails />
		</div>
	)
}

export default JobPage
