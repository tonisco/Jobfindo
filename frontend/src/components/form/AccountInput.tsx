import React, { FC, SetStateAction } from "react"

interface AccountInputProps {
	value: string
	changeValue: (value: SetStateAction<string>) => void
	type: string
	id: string
	label: string
}

const AccountInput: FC<AccountInputProps> = ({ changeValue, id, type, value, label }) => {
	return (
		<div className="flex flex-col gap-1 text-lg w-[60%]">
			<label htmlFor={id} className="font-bold">
				{label}
			</label>
			<input
				type={type}
				id={id}
				className="input"
				value={value}
				onChange={(e) => changeValue(e.target.value)}
			/>
		</div>
	)
}

export default AccountInput
