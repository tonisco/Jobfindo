import React from "react"
import { Route, Routes } from "react-router-dom"
import Header from "./components/ui/Header"
import JobPage from "./pages/JobPage"
import LoginPage from "./pages/LoginPage"

function App() {
	return (
		<div className="">
			<Header />
			<div className="min-h-[88.5vh] bg-gray-100">
				<Routes>
					<Route path="/login" element={<LoginPage />} />
					<Route path="/" element={<JobPage />} />
				</Routes>
			</div>
		</div>
	)
}

export default App
