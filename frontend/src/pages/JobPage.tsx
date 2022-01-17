import React, { useState } from "react"
import JobsList from "../components/subpage/JobsList"
import JobDetails from "../components/subpage/JobDetails"
import Modal from "../components/ui/Modal"
import ApplyForm from "../components/form/ApplyForm"

const JobPage = () => {
	const [isOpen, setIsOpen] = useState(true)

	return (
		<>
			<Modal isOpen={isOpen} setIsOpen={setIsOpen}>
				<ApplyForm setIsOpen={setIsOpen} />
			</Modal>
			<div className="max-w-5xl mx-auto flex w-full">
				<JobsList />
				<JobDetails setIsOpen={setIsOpen} />
			</div>
		</>
	)
}

export default JobPage
