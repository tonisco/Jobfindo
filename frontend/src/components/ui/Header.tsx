import React from "react"
import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { logout } from "../../app/slice"
import SearchBar from "./SearchBar"

const Header = () => {
	const user = useAppSelector((state) => state.User.user)
	const dispatch = useAppDispatch()

	return (
		<div className=" bg-sky-800">
			<div className="flex justify-between max-w-5xl px-2 sm:px-4 lg:px-0 py-4 items-center mx-auto gap-2 md:gap-4">
				<Link
					to="/"
					className="text-base sm:text-xl md:text-3xl text-rose-500 font-bold mont"
				>
					JobFindo
				</Link>
				<SearchBar />
				{user ? (
					<div className="flex gap-4 sm:gap-5 items-center text-white font-semibold">
						<Link to="/dashboard" className="hidden sm:inline-flex">
							Dashboard
						</Link>
						<img
							src={
								user.image
									? `http://localhost:5000/api/auth/image/${user.image}`
									: "/images/image.png"
							}
							alt="company logo"
							className="h-6 w-6 sm:h-9 sm:w-9 cursor-pointer rounded-full flex-shrink-0 flex-grow"
							onClick={() => dispatch(logout())}
						/>
					</div>
				) : (
					<div className="flex gap-4 sm:gap-5 items-center text-white font-semibold">
						<Link to="/login">Login</Link>
						<Link
							to="/register"
							className="hidden sm:inline-flex bg-rose-500 py-1 px-3 rounded-lg"
						>
							Register
						</Link>
					</div>
				)}
			</div>
		</div>
	)
}

export default Header
