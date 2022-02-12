import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import JobsList from "../components/subpage/JobsList"
import JobDetails from "../components/subpage/JobDetails"
import Modal from "../components/ui/Modal"
import ApplyForm from "../components/form/ApplyForm"
import { useGetAllJobsQuery } from "../app/api"
import Toast, { toastError } from "../components/ui/Toast"
import { ErrorData } from "../components/types"
import Spinner from "../components/ui/Spinner"

const JobPage = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [show, setShow] = useState("All")
	const [matches, setMatches] = useState(window.matchMedia("(max-width:767px)").matches)

	const { id } = useParams()

	const { data, isLoading, isError, error } = useGetAllJobsQuery(null)

	useEffect(() => {
		const match = () => setMatches(window.matchMedia("(max-width:767px)").matches)
		window.addEventListener("resize", match)
		if (matches) {
			if (id) {
				setShow("Detail")
			} else {
				setShow("List")
			}
		} else {
			setShow("All")
		}
		return () => window.removeEventListener("resize", match)
	}, [id, matches])

	useEffect(() => {
		if (error) {
			toastError((error as ErrorData).data.message)
		}
	}, [error])

	return (
		<>
			<Toast />
			<Modal isOpen={isOpen} setIsOpen={setIsOpen}>
				<ApplyForm setIsOpen={setIsOpen} />
			</Modal>
			<div className="max-w-5xl mx-auto h-[88.5vh] flex w-full">
				{isLoading ? (
					<Spinner />
				) : isError ? (
					<h1 className="text-center text-2xl">Server Error </h1>
				) : data && data.length > 0 ? (
					<>
						{(show === "All" || show === "List") && <JobsList data={data} />}
						{(show === "All" || show === "Detail") && (
							<JobDetails setIsOpen={setIsOpen} job={data[0]._id} />
						)}
					</>
				) : (
					<h1 className="text-center text-2xl">No Jobs matches Your request</h1>
				)}
			</div>
		</>
	)
}

export default JobPage
