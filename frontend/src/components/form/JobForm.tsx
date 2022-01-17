import React, { Dispatch, useState } from "react"
import { AiOutlineClose } from "react-icons/ai"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

interface JobFormProps {
	setIsOpen: Dispatch<boolean>
}

const JobForm = ({ setIsOpen }: JobFormProps) => {
	const [text, setText] = useState("")

	return (
		<form className="scale-up flex flex-col gap-4 items-center w-[85vw] md:w-[70vw] lg:w-[50vw] py-7">
			<AiOutlineClose
				className="cursor-pointer absolute right-5 top-5 text-xl"
				onClick={() => setIsOpen(false)}
			/>
			<h1 className="text-2xl font-bold">Job Create Form</h1>
			<div className="flex flex-col w-[85%] md:w-[70%]">
				<label htmlFor="title" className="text-sky-800 font-bold">
					Job Title
				</label>
				<input type="text" id="title" className="input-2" />
			</div>
			<div className="flex flex-col w-[85%] md:w-[70%]">
				<label htmlFor="location" className="text-sky-800 font-bold">
					Location
				</label>
				<input type="text" id="location" className="input-2" />
			</div>
			<div className="flex flex-col w-[85%] md:w-[70%]">
				<label htmlFor="type" className="text-sky-800 font-bold">
					Type
				</label>
				<select id="type" className="input-2">
					<option value="On-site">On-site</option>
					<option value="Remote">Remote</option>
					<option value="Hybrid">Hybrid</option>
				</select>
			</div>
			<div className="flex flex-col w-[85%] md:w-[70%]">
				<label htmlFor="pay" className="text-sky-800 font-bold">
					Pay Range
				</label>
				<input type="text" id="pay" className="input-2" />
			</div>
			<div className="flex flex-col w-[85%] md:w-[70%]">
				<label htmlFor="length" className="text-sky-800 font-bold">
					Length
				</label>
				<select id="length" className="input-2">
					<option value="Full Time">Full Time</option>
					<option value="Part Time">Part Time</option>
				</select>
			</div>
			<div className="flex flex-col w-[85%] md:w-[70%]">
				<label htmlFor="type" className="text-sky-800 font-bold">
					Level
				</label>
				<select id="type" className="input-2">
					<option value="Internship Level">Internship Level</option>
					<option value="Entry level">Entry level</option>
					<option value="Mid-Senior level">Mid-Senior level</option>
					<option value="Senior level">Senior level</option>
					<option value="Executive level">Executive level</option>
				</select>
			</div>
			<div className="flex flex-col w-[85%] md:w-[70%]">
				<label htmlFor="description" className="text-sky-800 font-bold">
					Description
				</label>
				<ReactQuill
					value={text}
					onChange={(e) => setText(e)}
					theme="snow"
					className="h-[26rem] overflow-y-hidden input-3"
				/>
			</div>
			<button
				type="submit"
				className="bg-sky-800 w-[85%] md:w-[70%] text-white font-bold py-1 hover:bg-sky-900 rounded-md"
			>
				ADD
			</button>
		</form>
	)
}

export default JobForm
