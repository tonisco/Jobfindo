import React, { ChangeEvent, Dispatch, FormEvent, useEffect, useState } from "react"
import { AiOutlineClose } from "react-icons/ai"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { clearMessage, updateDetails } from "../../app/slice"
import { toastError, toastSuccess } from "../ui/Toast"
import DetailsInput from "./DetailsInput"

interface DetailsFormProps {
	setIsOpen: Dispatch<boolean>
}

const DetailsForm = ({ setIsOpen }: DetailsFormProps) => {
	const [companyDetails, setCompanyDetails] = useState("")
	const [image, setImage] = useState<File>()
	const [newLogo, setNewLogo] = useState<string>()
	const [name, setName] = useState("")
	const [numberOfEmployees, setNumberOfEmployees] = useState("")

	const { user, error, message } = useAppSelector((state) => state.User)
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (user) {
			const { name, numberOfEmployees, companyDetails } = user
			setName(name)
			setNumberOfEmployees(numberOfEmployees)
			setCompanyDetails(companyDetails)
		}
	}, [user])

	const showImage = (e: ChangeEvent<HTMLInputElement>) => {
		const fileReader = new FileReader()
		if (e.target.files![0]) {
			fileReader.readAsDataURL(e.target.files![0])
			setImage(e.target.files![0])
		}
		fileReader.onload = (event) => {
			setNewLogo(event.target!.result as string)
		}
	}

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()
		if (name.length < 2) {
			return toastError("Name must contain at least 3 characters")
		}
		const form = new FormData()
		const image = changeName()
		if (image) {
			form.append("image", image)
		}
		form.append("name", name)
		form.append("numberOfEmployees", numberOfEmployees)
		form.append("companyDetails", companyDetails)
		dispatch(updateDetails(form))
		setIsOpen(false)
	}

	const changeName = () => {
		if (image && name) {
			const newNameSplit = image.name.split(".")
			const newNameSplit1 = name.split(" ").join("_")
			const newName = newNameSplit1 + "." + newNameSplit[newNameSplit.length - 1]
			return new File([image], newName, {
				type: image.type,
				lastModified: image.lastModified,
			})
		}
	}

	useEffect(() => {
		if (error) {
			toastError(error)
		}
		if (message) {
			toastSuccess(message)
		}
		dispatch(clearMessage())
	}, [error, message, dispatch])

	return (
		<>
			<form
				className="flex flex-col gap-4 items-center w-[85vw] md:w-[75vw] lg:w-[60vw] py-7"
				onSubmit={handleSubmit}
			>
				<AiOutlineClose
					className="cursor-pointer absolute right-5 top-5 text-xl"
					onClick={() => setIsOpen(false)}
				/>
				<h1 className="text-2xl font-bold">Company Details</h1>
				<DetailsInput changeValue={setName} id="name" label="Company Name" value={name} />
				{(user && user.image) || newLogo ? (
					<div className="flex w-[85%] md:w-[70%] items-center space-x-10">
						<img
							src={
								newLogo
									? newLogo
									: `http://localhost:5000/api/auth/image/${user!.image}`
							}
							alt="logo"
							className="h-36 rounded-md"
						/>
						<label
							htmlFor="changeLogo"
							className="text-sky-800 font-bold cursor-pointer text-lg"
						>
							Change Logo
						</label>
						<input
							type="file"
							id="changeLogo"
							className="hidden"
							accept="image/png, image/jpeg ,image/png"
							onChange={showImage}
						/>
					</div>
				) : (
					<div className="flex flex-col w-[85%] md:w-[70%]">
						<label htmlFor="logo" className="text-sky-800 font-bold">
							Logo
						</label>
						<input
							type="file"
							id="logo"
							className="w-full border-2 rounded-md border-sky-800 focus:outline-0"
							accept="image/png, image/jpeg ,image/png"
							onChange={showImage}
						/>
					</div>
				)}
				<DetailsInput
					changeValue={setNumberOfEmployees}
					id="numberOfEmployees"
					label="Number of Employees"
					value={numberOfEmployees}
				/>
				<div className="flex flex-col w-[85%] md:w-[70%]">
					<label htmlFor="companyDetails" className="text-sky-800 font-bold">
						Company Details
					</label>
					<textarea
						id="companyDetails"
						className="input-2"
						rows={10}
						value={companyDetails}
						onChange={(e) => setCompanyDetails(e.target.value)}
					/>
				</div>
				<button
					type="submit"
					className="bg-sky-800 w-[85%] md:w-[70%] text-white font-bold py-1 hover:bg-sky-900 rounded-md"
				>
					SAVE
				</button>
			</form>
		</>
	)
}

export default DetailsForm
