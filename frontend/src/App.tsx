import React from "react"
import { Route, Routes } from "react-router-dom"
import AlreadyAuth from "./components/auth/AlreadyAuth"
import RequireAuth from "./components/auth/RequireAuth"
import Header from "./components/ui/Header"
import ApplicationPage from "./pages/ApplicationPage"
import DashboardPage from "./pages/DashboardPage"
import JobPage from "./pages/JobPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"

function App() {
	return (
		<div className="">
			<Header />
			<div className="h-[calc(100vh-70px)] bg-gray-100">
				<Routes>
					<Route element={<RequireAuth />}>
						<Route path="/dashboard" element={<DashboardPage />} />
						<Route path="/dashboard/job/:id" element={<ApplicationPage />} />
					</Route>
					<Route element={<AlreadyAuth />}>
						<Route path="/login" element={<LoginPage />} />
						<Route path="/register" element={<RegisterPage />} />
					</Route>
					<Route path="/job/:id" element={<JobPage />} />
					<Route path="/" element={<JobPage />} />
				</Routes>
			</div>
		</div>
	)
}

export default App
