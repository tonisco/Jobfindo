import React, { FC, SetStateAction } from "react"

interface DetailsInputProps {
	value: string
	changeValue: (value: SetStateAction<string>) => void
	type?: string
	id: string
	label: string
}

const DetailsInput: FC<DetailsInputProps> = ({ changeValue, id, type, value, label }) => {
	return (
		<div className="flex flex-col w-[85%] md:w-[70%]">
			<label htmlFor={id} className="text-sky-800 font-bold">
				{label}
			</label>
			<input
				type={type ? type : "text"}
				id={id}
				className="input-2"
				value={value}
				onChange={(e) => changeValue(e.target.value)}
				required
			/>
		</div>
	)
}

export default DetailsInput
