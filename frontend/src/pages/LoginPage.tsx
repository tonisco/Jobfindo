import React, { FormEvent, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { clearMessage, login } from "../app/slice"
import AccountInput from "../components/form/AccountInput"
import Toast, { toastError, toastSuccess } from "../components/ui/Toast"

const LoginPage = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const { error, message, loading, user } = useAppSelector((state) => state.User)

	const submit = (e: FormEvent) => {
		e.preventDefault()
		dispatch(login({ email, password }))
	}

	useEffect(() => {
		if (error) {
			toastError(error)
		}
		if (message) {
			toastSuccess(message)
		}
		dispatch(clearMessage())
	}, [error, message, dispatch])

	useEffect(() => {
		if (user) {
			navigate("/dashboard")
		}
	}, [user, navigate])

	return (
		<>
			<Toast />
			<main className="relative z-0 h-[90.2vh]">
				<div className="z-[999999] absolute h-full w-full grid-cols-1 lg:grid-cols-2 grid">
					<div className="hidden lg:flex h-full flex-col text-white gap-4 items-center justify-center">
						<h1 className="text-3xl font-bold">Find your perfect</h1>
						<h1 className="text-6xl uppercase font-bold text-rose-500">Candidates</h1>
						<img src="/images/login.svg" alt="login" className="h-60" />
					</div>
					<form
						className="p-4 flex flex-col items-center justify-center gap-4"
						onSubmit={submit}
					>
						<h1 className="uppercase text-rose-500 text-4xl font-bold">Login</h1>
						<AccountInput
							changeValue={setEmail}
							id="email"
							label="Email"
							type="email"
							value={email}
						/>
						<AccountInput
							changeValue={setPassword}
							id="password"
							label="Password"
							type="password"
							value={password}
						/>
						<button
							className={`bg-rose-500 text-white py-2 px-4 rounded-lg uppercase ${
								loading ? "bg-rose-700 cursor-not-allowed" : "hover:bg-rose-600"
							}`}
							disabled={loading}
						>
							Login
						</button>
						<p className="text-sm">
							Don't have an account?{"  "}
							<Link to="/register" className="text-rose-500 underline">
								Register
							</Link>
						</p>
					</form>
				</div>
				<div className="hidden lg:block h-full w-full clip bg-cyan-400 absolute top-0 left-0 z-0">
					<div className="h-full w-full clip-1 bg-cyan-500"></div>
				</div>
			</main>
		</>
	)
}

export default LoginPage
