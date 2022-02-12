import React from "react"
import { FaRegSave } from "react-icons/fa"
import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { logout } from "../../app/slice"
import SearchBar from "./SearchBar"

const Header = () => {
	const user = useAppSelector((state) => state.User.user)
	const dispatch = useAppDispatch()

	return (
		<div className=" bg-sky-800">
			<div className="flex justify-between max-w-5xl px-4 md:px-0 py-4 items-center mx-auto">
				<Link to="/" className="text-xl md:text-3xl text-rose-500 font-bold mont">
					Job Findo
				</Link>
				<SearchBar />
				{user.name ? (
					<div className="flex gap-2 sm:gap-4 items-center text-white font-semibold">
						<FaRegSave className="h-6 w-6" />
						<Link to="/dashboard">Dashboard</Link>
						<img
							src="/images/image.png"
							alt="company logo"
							className="h-8 w-8 cursor-pointer rounded-full"
							onClick={() => dispatch(logout())}
						/>
					</div>
				) : (
					<div className="flex gap-2 sm:gap-4 items-center text-white font-semibold">
						<FaRegSave className="h-6 w-6" />
						<Link to="/login">Login</Link>
						<p className="hidden sm:inline-flex bg-rose-500 py-1 px-3 rounded-lg">
							Register
						</p>
					</div>
				)}
			</div>
		</div>
	)
}

export default Header
