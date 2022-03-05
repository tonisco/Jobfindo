import React, { Dispatch, FC, FormEvent, useEffect, useState } from "react"
import { AiOutlineClose } from "react-icons/ai"
import { useApplyJobMutation } from "../../app/api"
import { ErrorData } from "../types/types"
import FileInput from "../ui/FileInput"
import { toastError, toastSuccess } from "../ui/Toast"
import DetailsInput from "./DetailsInput"

interface ApplyFormProps {
	setIsOpen: Dispatch<boolean>
	id: string
}

const ApplyForm: FC<ApplyFormProps> = ({ setIsOpen, id }) => {
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [address, setAddress] = useState("")
	const [phone, setPhone] = useState("")
	const [coverLetter, setCoverLetter] = useState("")
	const [file, setFile] = useState<File>()

	const [apply, { isLoading, data, error, isSuccess }] = useApplyJobMutation()

	const applyJob = (e: FormEvent) => {
		e.preventDefault()
		if (name.trim().length < 3) return toastError("Name must contain at least 3 characters")

		const form = new FormData()
		form.append("full_name", name)
		form.append("email", email)
		form.append("address", name)
		form.append("phone", phone)
		form.append("cover_letter", coverLetter)
		const file = changeName()
		if (file) form.append("file", file)
		else return toastError("Your CV is required")
		apply({ id, data: form })
	}

	const clearInputs = () => {
		setName("")
		setEmail("")
		setPhone("")
		setAddress("")
		setFile(undefined)
		setCoverLetter("")
	}

	const changeName = () => {
		if (file && name) {
			const newNameSplit = file.name.split(".")
			const newNameSplit1 = name.split(" ").join("_")
			const newName = newNameSplit1 + "." + newNameSplit[newNameSplit.length - 1]
			return new File([file], newName, {
				type: file.type,
				lastModified: file.lastModified,
			})
		}
	}

	useEffect(() => {
		if (data) toastSuccess(data.message)
		if (error) {
			let err = (error as ErrorData).data.message
			toastError(err)
		}
		if (isSuccess) {
			setIsOpen(false)
			clearInputs()
		}
	}, [data, error, isSuccess, setIsOpen])

	return (
		<form
			className="scale-up flex flex-col gap-4 items-center w-[85vw] md:w-[70vw] lg:w-[50vw] py-7"
			onSubmit={applyJob}
		>
			<AiOutlineClose
				className="cursor-pointer absolute right-5 top-5 text-xl"
				onClick={() => setIsOpen(false)}
			/>
			<h1 className="text-2xl font-bold">Application Form</h1>
			<DetailsInput
				changeValue={setName}
				id="name"
				label="Full Name"
				type="text"
				value={name}
			/>
			<DetailsInput
				changeValue={setEmail}
				id="email"
				label="Email"
				type="email"
				value={email}
			/>
			<DetailsInput
				changeValue={setAddress}
				id="address"
				label="Address"
				type="text"
				value={address}
			/>
			<DetailsInput
				changeValue={setPhone}
				id="phone"
				label="Phone Number"
				type="tel"
				value={phone}
			/>
			<div className="flex flex-col w-[85%] md:w-[70%]">
				<label htmlFor="coverLetter" className="text-sky-800 font-bold">
					Cover Letter
				</label>
				<textarea
					id="coverLetter"
					className="input-2"
					rows={6}
					value={coverLetter}
					onChange={(e) => setCoverLetter(e.target.value)}
				/>
			</div>
			<div className="flex flex-col w-[85%] md:w-[70%]">
				<label className="text-sky-800 font-bold">CV</label>
				<FileInput setFile={setFile} file={file} />
			</div>
			<button
				type="submit"
				className="bg-sky-800 w-[85%] md:w-[70%] text-white font-bold py-1 hover:bg-sky-900 rounded-md"
				disabled={isLoading}
			>
				APPLY
			</button>
		</form>
	)
}

export default ApplyForm
