import React, { Dispatch } from "react"
import { AiOutlineClose } from "react-icons/ai"
import { ApplicationTypes } from "../types"

interface ApplicationDetailsProps {
	application: ApplicationTypes
	setIsOpen: Dispatch<boolean>
	setSelected: Dispatch<string>
}

const ApplicationDetails = ({ application, setSelected, setIsOpen }: ApplicationDetailsProps) => {
	const close = () => {
		setIsOpen(false)
		setSelected("")
	}

	return (
		<main className="flex flex-col gap-4 items-start w-[85vw] md:w-[70vw] lg:w-[50vw] py-7 px-4">
			<AiOutlineClose
				className="cursor-pointer absolute right-5 top-5 text-xl"
				onClick={close}
			/>
			<h1 className="text-3xl font-semibold self-center">Applicant Details</h1>
			<div className="flex gap-4">
				<h3 className="font-bold">Full Name:</h3>
				<h4>{application.full_name}</h4>
			</div>
			<div className="flex gap-4">
				<h3 className="font-bold">Email</h3>
				<h4>{application.email}</h4>
			</div>
			<div className="flex gap-4">
				<h3 className="font-bold">Address</h3>
				<h4>{application.address}</h4>
			</div>
			<div className="flex gap-4">
				<h3 className="font-bold">Phone</h3>
				<h4>{application.phone}</h4>
			</div>
			<div>
				<h3 className="font-bold">Cover Letter</h3>
				<h4>{application.cover_letter}</h4>
			</div>
			<button className="bg-rose-500 px-4 py-1 rounded-lg text-white">Download CV</button>
		</main>
	)
}

export default ApplicationDetails
