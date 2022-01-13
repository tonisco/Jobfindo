import React from "react"
import { FaSearch } from "react-icons/fa"
import { FiMapPin } from "react-icons/fi"
import { BsBriefcase } from "react-icons/bs"

const SearchBar = () => {
	return (
		<form className="flex w-[50%] pl-3  bg-white rounded-lg">
			<div className="flex-grow flex gap-2 p-1 items-center">
				<BsBriefcase className="text-rose-500 h-6 w-6" />
				<input type="text" className="h-10 w-full border-0 focus:outline-none" />
			</div>
			<div className="flex-grow flex gap-2 p-1 items-center border-l-2">
				<FiMapPin className="text-rose-500 h-6 w-6" />
				<input type="text" className="h-10 w-full border-0 focus:outline-none" />
			</div>
			<button className="bg-rose-500 px-5 py-2 text-white rounded-lg">
				<FaSearch className="h-6 w-6" />
			</button>
		</form>
	)
}

export default SearchBar
