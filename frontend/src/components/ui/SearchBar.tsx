import React, { FormEvent, useState } from "react"
import { FaSearch } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

const SearchBar = () => {
	const [keyword, setKeyword] = useState("")

	const navigate = useNavigate()

	const searchJob = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		navigate(`/?s=${keyword}`)
		setKeyword("")
	}

	return (
		<form
			className="flex pl-3 flex-grow sm:flex-grow-0 bg-white rounded-full max-w-[230px] sm:max-w-full"
			onSubmit={searchJob}
		>
			<div className="flex-grow flex gap-2 p-1 items-center">
				<input
					type="text"
					className=" h-4 sm:h-8 w-full md:w-64 border-0 focus:outline-none"
					placeholder="Search"
					value={keyword}
					onChange={(e) => setKeyword(e.target.value)}
				/>
			</div>
			<button
				className="bg-rose-500 px-1.5 sm:px-3 py-1.5 text-white rounded-full"
				type="submit"
			>
				<FaSearch className="h-4 sm:h-6 w-4 sm:w-6" />
			</button>
		</form>
	)
}

export default SearchBar
