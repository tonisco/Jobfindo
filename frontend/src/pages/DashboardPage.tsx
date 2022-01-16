import React from "react"
import { FaPlus } from "react-icons/fa"
import Pagination from "../components/ui/Pagination"
import Table from "../components/ui/Table"

const DashboardPage = () => {
	return (
		<main className="bg-white px-2 py-5 max-w-5xl mx-auto h-full">
			<div className="w-full flex justify-between">
				<button className="px-4 self-end py-1 bg-rose-500 text-white rounded-lg flex gap-2 items-center">
					<FaPlus /> <p>Create Job</p>
				</button>
			</div>
			<Table />
			<Pagination />
		</main>
	)
}

export default DashboardPage
