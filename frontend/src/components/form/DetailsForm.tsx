import React, { Dispatch, useEffect, useState } from "react"
import { AiOutlineClose } from "react-icons/ai"
import { useAppSelector } from "../../app/hooks"

interface DetailsFormProps {
	setIsOpen: Dispatch<boolean>
}

const DetailsForm = ({ setIsOpen }: DetailsFormProps) => {
	const [companyDetails, setCompanyDetails] = useState("")
	const [email, setEmail] = useState("")
	const [logo, setLogo] = useState("")
	const [name, setName] = useState("")
	const [numberOfEmployees, setNumberOfEmployees] = useState("")

	const user = useAppSelector((state) => state.User.user)

	useEffect(() => {
		if (user.name) {
			const { name, email, image, numberOfEmployees, companyDetails } = user
			setName(name)
			setEmail(email!)
			setLogo(image!)
			setNumberOfEmployees(numberOfEmployees!)
			setCompanyDetails(companyDetails!)
		}
	}, [user])

	return (
		<form className="flex flex-col gap-4 items-center w-[85vw] md:w-[70vw] lg:w-[50vw] py-7">
			<AiOutlineClose
				className="cursor-pointer absolute right-5 top-5 text-xl"
				onClick={() => setIsOpen(false)}
			/>
			<h1 className="text-2xl font-bold">Company Details</h1>
			<div className="flex flex-col w-[85%] md:w-[70%]">
				<label htmlFor="name" className="text-sky-800 font-bold">
					Company Name
				</label>
				<input
					type="text"
					id="name"
					className="input-2"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
			</div>
			<div className="flex flex-col w-[85%] md:w-[70%]">
				<label htmlFor="email" className="text-sky-800 font-bold">
					Email
				</label>
				<input
					type="email"
					id="email"
					className="input-2"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</div>
			<div className="flex flex-col w-[85%] md:w-[70%]">
				<label htmlFor="logo" className="text-sky-800 font-bold">
					Logo
				</label>
				<input
					type="text"
					id="logo"
					className="input-2"
					value={logo}
					onChange={(e) => setLogo(e.target.value)}
				/>
			</div>
			<div className="flex flex-col w-[85%] md:w-[70%]">
				<label htmlFor="numberOfEmployees" className="text-sky-800 font-bold">
					Number of Employees
				</label>
				<input
					type="text"
					id="numberOfEmployees"
					className="input-2"
					placeholder="e.g 10 - 20"
					value={numberOfEmployees}
					onChange={(e) => setNumberOfEmployees(e.target.value)}
				/>
			</div>
			<div className="flex flex-col w-[85%] md:w-[70%]">
				<label htmlFor="companyDetails" className="text-sky-800 font-bold">
					Company Details
				</label>
				<textarea
					id="companyDetails"
					className="input-2"
					rows={6}
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
	)
}

export default DetailsForm
