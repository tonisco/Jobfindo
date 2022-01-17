import React, { useState } from "react"
import { FaPlus } from "react-icons/fa"
import JobForm from "../components/form/JobForm"
import Modal from "../components/ui/Modal"
import Pagination from "../components/ui/Pagination"
import Table from "../components/ui/Table"

const DashboardPage = () => {
	const [isOpen, setIsOpen] = useState(true)

	return (
		<>
			<Modal isOpen={isOpen} setIsOpen={setIsOpen}>
				<div className="">
					<JobForm setIsOpen={setIsOpen} />
				</div>
			</Modal>
			<main className="bg-white px-2 py-5 max-w-5xl mx-auto h-full">
				<div className="w-full flex justify-between">
					<button
						className="px-4 self-end py-1 bg-rose-500 text-white rounded-lg flex gap-2 items-center"
						onClick={() => setIsOpen(true)}
					>
						<FaPlus /> <p>Create Job</p>
					</button>
				</div>
				<Table />
				<Pagination />
			</main>
		</>
	)
}

export default DashboardPage
