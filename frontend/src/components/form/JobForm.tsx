import React, { Dispatch, FormEvent, useCallback, useEffect, useState } from "react"
import { AiOutlineClose } from "react-icons/ai"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { Link } from "react-router-dom"
import {
	useCompanyJobDeleteMutation,
	useCompanyJobsCreateMutation,
	useCompanyJobsEditMutation,
} from "../../app/api"
import { ErrorData, JobType } from "../types/types"
import { toastError, toastSuccess } from "../ui/Toast"
import DetailsInput from "./DetailsInput"
import DetailsSelect from "./DetailsSelect"

interface JobFormProps {
	setIsOpen: Dispatch<boolean>
	job: JobType | undefined
	setSelected: Dispatch<string>
	selected: string
	isOpen: boolean
}

const JobForm = ({ setIsOpen, job, setSelected, selected, isOpen }: JobFormProps) => {
	const [title, setTitle] = useState("")
	const [location, setLocation] = useState("")
	const [type, setType] = useState("On-site")
	const [payRange, setPayRange] = useState("")
	const [length, setLength] = useState("Full Time")
	const [level, setLevel] = useState("Internship Level")
	const [deadline, setDeadline] = useState("")
	const [description, setDescription] = useState("")

	const [
		editJob,
		{ error: editError, isLoading: editLoading, data: editData, isSuccess: editSuccess },
	] = useCompanyJobsEditMutation()

	const [
		createJob,
		{
			error: createError,
			isLoading: createLoading,
			data: createData,
			isSuccess: createSuccess,
		},
	] = useCompanyJobsCreateMutation()

	const [
		deleteJob,
		{
			error: deleteError,
			data: deleteData,
			isLoading: deleteLoading,
			isSuccess: deleteSuccess,
		},
	] = useCompanyJobDeleteMutation()

	const close = useCallback(() => {
		setIsOpen(false)
		setSelected("")
	}, [setIsOpen, setSelected])

	const clearInputs = () => {
		setTitle("")
		setDescription("")
		setLength("Full Time")
		setLevel("Internship Level")
		setLocation("")
		setDeadline("")
		setType("On-site")
		setPayRange("")
	}

	useEffect(() => {
		if (job) {
			const {
				description,
				length,
				level,
				location,
				title,
				type,
				pay_range,
				applicationDeadline,
			} = job
			let date = applicationDeadline ? applicationDeadline.toString().split(".")[0] : ""
			setTitle(title)
			setDescription(description)
			setLength(length)
			setLevel(level)
			setLocation(location)
			setType(type)
			setDeadline(date)
			setPayRange(pay_range)
		} else {
			clearInputs()
		}
	}, [job])

	const submitJob = (e: FormEvent) => {
		e.preventDefault()
		if (title.length < 3) {
			return toastError("Title must be at least 4 characters")
		}
		if (location.length < 3) {
			return toastError("Location must be at least 4 characters")
		}
		if (description.length < 19) {
			return toastError("Description must be at least 20 characters")
		}
		const input = {
			description,
			location,
			length,
			level,
			title,
			pay_range: payRange,
			applicationDeadline: deadline,
			type,
		}
		if (job) {
			editJob({ id: job._id, input })
		} else {
			createJob({ input })
		}
	}

	useEffect(() => {
		if (editError) {
			let err = (editError as ErrorData).data.message
			toastError(err)
		}

		if (createError) {
			let err = (createError as ErrorData).data.message
			toastError(err)
		}

		if (deleteError) {
			let err = (deleteError as ErrorData).data.message
			toastError(err)
		}
	}, [editError, createError, deleteError])

	useEffect(() => {
		if (editData) toastSuccess(editData.message)

		if (createData) toastSuccess(createData.message)

		if (deleteData) toastSuccess(deleteData.message)

		if (editSuccess || createSuccess || deleteSuccess) {
			clearInputs()
			close()
		}
	}, [editData, createData, editSuccess, createSuccess, deleteSuccess, deleteData, close])

	const typeData = ["On-site", "Remote", "Hybrid"]
	const lengthData = ["Full Time", "Part Time"]
	const levelData = [
		"Internship Level",
		"Entry level",
		"Mid-Senior level",
		"Senior level",
		"Executive level",
	]

	return (
		<form
			className="flex flex-col gap-4 items-center w-[85vw] md:w-[70vw] lg:w-[50vw] py-7"
			onSubmit={submitJob}
		>
			<AiOutlineClose
				className="cursor-pointer absolute right-5 top-5 text-xl"
				onClick={close}
			/>

			{selected && (
				<Link
					to={`/dashboard/job/${selected}`}
					className="px-4 py-1 bg-rose-500 text-white cursor-pointer rounded-lg font-semibold"
				>
					View Applicants
				</Link>
			)}
			<h1 className="text-2xl font-bold">{selected ? "Job Edit Form" : "Job Create Form"}</h1>
			<DetailsInput changeValue={setTitle} id="title" label="Job Title" value={title} />
			<DetailsInput
				changeValue={setLocation}
				id="location"
				label="location"
				value={location}
			/>
			<DetailsSelect
				id="type"
				label="Type"
				options={typeData}
				setValue={setType}
				value={type}
			/>
			<DetailsInput changeValue={setPayRange} id="pay" label="Pay Range" value={payRange} />
			<DetailsSelect
				id="length"
				label="Length"
				options={lengthData}
				setValue={setLength}
				value={length}
			/>
			<DetailsSelect
				id="level"
				label="Level"
				options={levelData}
				setValue={setLevel}
				value={level}
			/>
			<DetailsInput
				changeValue={setDeadline}
				id="date"
				label="Application Deadline"
				type="datetime-local"
				value={deadline}
			/>
			<div className="flex flex-col w-[85%] md:w-[70%]">
				<label htmlFor="description" className="text-sky-800 font-bold">
					Description
				</label>
				<ReactQuill
					value={description}
					onChange={(e) => setDescription(e)}
					theme="snow"
					className="h-[26rem] overflow-y-hidden input-3"
				/>
			</div>
			<div className="flex justify-between w-[85%] md:w-[70%]">
				<button
					type="submit"
					className="bg-sky-800 text-white font-bold py-2 px-4 hover:bg-sky-900 rounded-md disabled:bg-sky-900"
					disabled={editLoading ? editLoading : createLoading}
				>
					SAVE
				</button>
				<button
					type="button"
					className="bg-red-600 text-white font-bold py-2 px-4 hover:bg-red-700 rounded-md disabled:bg-red-800"
					disabled={
						editLoading ? editLoading : createLoading ? createLoading : deleteLoading
					}
					onClick={() => (job ? deleteJob({ id: job._id }) : close())}
				>
					{job ? "DELETE" : "CANCEL"}
				</button>
			</div>
		</form>
	)
}

export default JobForm
