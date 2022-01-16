import React from "react"
import { FaRegSave } from "react-icons/fa"
import { Link } from "react-router-dom"
import SearchBar from "./SearchBar"

const Header = () => {
	return (
		<div className=" bg-sky-800">
			<div className="flex justify-between max-w-5xl py-4 items-center mx-auto">
				<Link to="/" className="text-4xl text-rose-500 font-bold mont">
					Job Findo
				</Link>
				<SearchBar />
				<div className="flex gap-4 text-lg items-center text-white font-semibold">
					<FaRegSave className="h-6 w-6" />
					<Link to="/login">Login</Link>
					<p className="bg-rose-500 py-1 px-4 rounded-lg">Register</p>
				</div>
			</div>
		</div>
	)
}

export default Header
