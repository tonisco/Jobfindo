import React from "react"
import { FaSearch } from "react-icons/fa"
import { FiMapPin } from "react-icons/fi"
import { BsBriefcase } from "react-icons/bs"

const SearchBar = () => {
	return (
		<form className="flex pl-3  bg-white rounded-full">
			<div className="hidden flex-grow md:flex gap-2 p-1 items-center">
				{/* <BsBriefcase className="text-rose-500 h-5 w-5" /> */}
				<input
					type="text"
					className="h-7 w-32 md:w-64 border-0 focus:outline-none"
					placeholder="Search Job"
				/>
			</div>
			{/* <div className="flex-grow flex gap-2 p-1 items-center border-l-2">
				<FiMapPin className="text-rose-500 h-5 w-5" />
				<input type="text" className="h-8 w-full border-0 focus:outline-none" />
			</div> */}
			<button className="bg-rose-500 px-4 py-2 text-white rounded-full">
				<FaSearch className="h-4 w-4" />
			</button>
		</form>
	)
}

export default SearchBar
