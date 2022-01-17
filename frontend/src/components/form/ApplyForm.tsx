import React, { Dispatch } from "react"
import { AiOutlineClose } from "react-icons/ai"
import FileInput from "../ui/FileInput"

interface ApplyFormProps {
	setIsOpen: Dispatch<boolean>
}

const ApplyForm = ({ setIsOpen }: ApplyFormProps) => {
	return (
		<form className="scale-up flex flex-col gap-4 items-center w-[85vw] md:w-[70vw] lg:w-[50vw] py-7">
			<AiOutlineClose
				className="cursor-pointer absolute right-5 top-5 text-xl"
				onClick={() => setIsOpen(false)}
			/>
			<h1 className="text-2xl font-bold">Application Form</h1>
			<div className="flex flex-col w-[85%] md:w-[70%]">
				<label htmlFor="name" className="text-sky-800 font-bold">
					Full Name
				</label>
				<input type="text" id="name" className="input-2" />
			</div>
			<div className="flex flex-col w-[85%] md:w-[70%]">
				<label htmlFor="email" className="text-sky-800 font-bold">
					Email
				</label>
				<input type="email" id="email" className="input-2" />
			</div>
			<div className="flex flex-col w-[85%] md:w-[70%]">
				<label htmlFor="location" className="text-sky-800 font-bold">
					Location
				</label>
				<input type="text" id="location" className="input-2" />
			</div>
			<div className="flex flex-col w-[85%] md:w-[70%]">
				<label htmlFor="phone" className="text-sky-800 font-bold">
					Phone Number
				</label>
				<input type="tel" id="phone" className="input-2" />
			</div>
			<div className="flex flex-col w-[85%] md:w-[70%]">
				<FileInput />
			</div>
			<button
				type="submit"
				className="bg-sky-800 w-[85%] md:w-[70%] text-white font-bold py-1 hover:bg-sky-900 rounded-md"
			>
				APPLY
			</button>
		</form>
	)
}

export default ApplyForm
