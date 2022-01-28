import React, { useEffect, useState } from "react"
import JobsList from "../components/subpage/JobsList"
import JobDetails from "../components/subpage/JobDetails"
import Modal from "../components/ui/Modal"
import ApplyForm from "../components/form/ApplyForm"
import { useGetAllJobsQuery } from "../app/api"

const JobPage = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [job, setJob] = useState<string>()

	const { data, isLoading } = useGetAllJobsQuery(null)

	useEffect(() => {
		if (data && data.length > 0) {
			setJob(data[0]._id)
		}
	}, [data])

	return (
		<>
			<Modal isOpen={isOpen} setIsOpen={setIsOpen}>
				<ApplyForm setIsOpen={setIsOpen} />
			</Modal>
			<div className="max-w-5xl mx-auto flex w-full">
				{data && <JobsList data={data} />}
				{job && <JobDetails setIsOpen={setIsOpen} job={job} />}
			</div>
		</>
	)
}

export default JobPage
