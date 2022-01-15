import React from "react"

const LoginPage = () => {
	return (
		<main className="relative z-0 h-[88.5vh]">
			<div className="z-[999999] absolute h-full w-full grid-cols-1 lg:grid-cols-2 grid">
				<div className="hidden lg:flex h-full flex-col text-white gap-4 items-center justify-center">
					<h1 className="text-3xl font-bold">Find your perfect</h1>
					<h1 className="text-6xl uppercase font-bold text-rose-500">Candidates</h1>
					<img src="/images/login.svg" alt="login-image" className="h-60" />
				</div>
				<form className="p-4 flex flex-col items-center justify-center gap-4">
					<h1 className="uppercase text-rose-500 text-4xl font-bold">Login</h1>
					<div className="flex flex-col gap-1 text-lg w-[60%]">
						<label htmlFor="email">Email</label>
						<input type="email" id="email" className="input" />
					</div>
					<div className="flex flex-col gap-1 text-lg w-[60%]">
						<label htmlFor="password">Password</label>
						<input type="password" id="password" className="input" />
					</div>
				</form>
			</div>
			<div className="hidden lg:block h-full w-full clip bg-cyan-400 absolute top-0 left-0 z-0">
				<div className="h-full w-full clip-1 bg-cyan-500"></div>
			</div>
		</main>
	)
}

export default LoginPage
