import React, { FC, SetStateAction } from "react"

interface DetailsSelectProps {
	label: string
	id: string
	value: string
	setValue: (value: SetStateAction<string>) => void
	options: string[]
}

const DetailsSelect: FC<DetailsSelectProps> = ({ id, label, options, setValue, value }) => {
	return (
		<div className="flex flex-col w-[85%] md:w-[70%]">
			<label htmlFor={id} className="text-sky-800 font-bold">
				{label}
			</label>
			<select
				id={id}
				className="input-2"
				value={value}
				onChange={(e) => setValue(e.target.value)}
			>
				{options.map((data) => (
					<option value={data} key={data}>
						{data}
					</option>
				))}
			</select>
		</div>
	)
}

export default DetailsSelect
