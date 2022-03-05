import React, { FormEvent, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { clearMessage, signup } from "../app/slice"
import AccountInput from "../components/form/AccountInput"
import Toast, { toastError, toastSuccess } from "../components/ui/Toast"

const RegisterPage = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")
	const [name, setName] = useState("")
	const [numberOfEmployees, setNumberOfEmployees] = useState("")
	const [companyDetails, setCompanyDetails] = useState("")
	const [image, setImage] = useState<File>()

	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const { error, message, loading, user } = useAppSelector((state) => state.User)

	const submit = (e: FormEvent) => {
		e.preventDefault()
		if (name.length < 2) {
			return toastError("Name must contain at least 3 characters")
		}
		if (password !== confirmPassword) {
			return toastError("Passwords do not match")
		}
		const form = new FormData()
		const image = changeName()
		if (image) {
			form.append("image", image)
		}
		form.append("name", name)
		form.append("email", email)
		form.append("password", password)
		form.append("companyDetails", companyDetails)
		form.append("numberOfEmployees", numberOfEmployees)
		dispatch(signup(form))
	}

	const changeName = () => {
		if (image && name) {
			const newNameSplit = image.name.split(".")
			const newNameSplit1 = name.split(" ").join("_")
			const newName = newNameSplit1 + "." + newNameSplit[newNameSplit.length - 1]
			return new File([image], newName, {
				type: image.type,
				lastModified: image.lastModified,
			})
		}
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
						className="px-4 pb-16 pt-96 flex flex-col items-center justify-center gap-4 overflow-y-scroll h-full scrollbar-hide"
						onSubmit={submit}
					>
						<h1 className="uppercase text-rose-500 text-4xl font-bold mt-36">
							Register
						</h1>
						<AccountInput
							changeValue={setName}
							id="name"
							label="Company Name"
							type="text"
							value={name}
						/>
						<AccountInput
							changeValue={setEmail}
							id="email"
							label="Email"
							type="email"
							value={email}
						/>
						<div className="flex flex-col gap-1 text-lg w-[60%]">
							<label htmlFor="logo" className="font-bold">
								Logo
							</label>
							<input
								type="file"
								id="logo"
								className="input"
								accept="image/png, image/jpeg ,image/png"
								onChange={(e) => {
									setImage(e.target.files![0])
								}}
							/>
						</div>
						<AccountInput
							changeValue={setNumberOfEmployees}
							id="Number of Employees"
							label="Number of Employees"
							type="text"
							value={numberOfEmployees}
						/>
						<div className="flex flex-col gap-1 text-lg w-[60%]">
							<label htmlFor="companyDetails" className="font-bold">
								Company Details
							</label>
							<textarea
								id="companyDetails"
								className="input"
								rows={10}
								value={companyDetails}
								onChange={(e) => setCompanyDetails(e.target.value)}
							/>
						</div>
						<AccountInput
							changeValue={setPassword}
							id="password"
							label="Password"
							type="password"
							value={password}
						/>
						<AccountInput
							changeValue={setConfirmPassword}
							id="Confirm Password"
							label="Confirm Password"
							type="password"
							value={confirmPassword}
						/>
						<button
							className={`bg-rose-500 text-white py-2 px-4 rounded-lg uppercase ${
								loading ? "bg-rose-700 cursor-not-allowed" : "hover:bg-rose-600"
							}`}
							disabled={loading}
						>
							REGISTER
						</button>
						<p className="text-sm">
							Already have an account?{"  "}
							<Link to="/register" className="text-rose-500 underline">
								Login
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

export default RegisterPage
