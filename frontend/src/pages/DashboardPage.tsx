import React, { useEffect, useMemo, useState } from "react"
import { FaPlus } from "react-icons/fa"
import { FiUser } from "react-icons/fi"
import { useSearchParams } from "react-router-dom"
import { Cell, Column } from "react-table"
import { useCompanyJobsQuery } from "../app/api"
import { useAppDispatch } from "../app/hooks"
import { logout } from "../app/slice"
import DetailsForm from "../components/form/DetailsForm"
import JobForm from "../components/form/JobForm"
import { ErrorData, JobType } from "../components/types/types"
import Modal from "../components/ui/Modal"
import Pagination from "../components/ui/Pagination"
import Spinner from "../components/ui/Spinner"
import Table from "../components/ui/Table"
import Toast, { toastError } from "../components/ui/Toast"

const DashboardPage = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [isDetails, setIsDetails] = useState(false)
	const [selected, setSelected] = useState("")
	const [selectedJob, setSelectedJob] = useState<JobType>()
	const [page, setPage] = useState<string>()

	const [searchParams] = useSearchParams()

	const dispatch = useAppDispatch()

	const { data, error, isError, isLoading } = useCompanyJobsQuery(
		{ page },
		{ refetchOnMountOrArgChange: true }
	)

	useEffect(() => {
		if (error) {
			let err = (error as ErrorData).data.message
			if (err === "Not authorized, token failed") {
				dispatch(logout())
			} else toastError(err)
		}
	}, [dispatch, error])

	useEffect(() => {
		if (selected) {
			let job = data?.data.find((item) => item._id === selected)
			if (job) {
				setSelectedJob(job)
			} else toastError(`Job with id ${selected} was not found`)
		} else {
			setSelectedJob(undefined)
		}
	}, [selected, data])

	useEffect(() => {
		const currPage = searchParams.get("page")
		if (currPage) {
			setPage(currPage)
		}
	}, [searchParams])

	const columns = useMemo<Column<JobType>[]>(
		() => [
			{
				Header: "Job Title",
				accessor: "title",
			},
			{
				Header: "Applicants",
				accessor: "total_applicants",
			},
			{
				Header: "Modified",
				accessor: "updatedAt",
				Cell: (row: Cell<JobType>) =>
					new Date(row.row.original.updatedAt).toLocaleDateString(),
			},
			{
				accessor: "_id",
				Cell: (row: Cell<JobType>) => (
					<button
						onClick={() => {
							setSelected(row.row.original._id)
							setIsOpen(true)
						}}
						className="text-xs sm:text-base px-1 sm:px-3 py-1 my-1 bg-sky-800 text-white cursor-pointer"
					>
						DETAILS
					</button>
				),
			},
		],
		[setSelected]
	)

	return (
		<>
			<Modal isOpen={isOpen} setIsOpen={setIsOpen} setSelected={setSelected}>
				<JobForm
					isOpen={isOpen}
					setIsOpen={setIsOpen}
					job={selectedJob}
					setSelected={setSelected}
					selected={selected}
				/>
			</Modal>
			<Modal isOpen={isDetails} setIsOpen={setIsDetails}>
				<DetailsForm setIsOpen={setIsDetails} />
			</Modal>
			<Toast />
			<main className="bg-white px-2 py-5 max-w-5xl mx-auto h-full w-full">
				<div className="w-full flex items-center justify-between">
					<button
						className="px-2 text-sm sm:text-base md:px-4 self-end py-1 bg-rose-500 text-white rounded-lg flex gap-2 items-center"
						onClick={() => setIsOpen(true)}
					>
						<FaPlus /> <p>Create Job</p>
					</button>
					<button
						className="px-2 text-sm sm:text-base md:px-4 self-end py-1 bg-rose-500 text-white rounded-lg flex gap-2 items-center"
						onClick={() => setIsDetails(true)}
					>
						<FiUser /> <p>Company Details</p>
					</button>
				</div>
				{isLoading ? (
					<Spinner />
				) : isError ? (
					<h1 className="text-3xl text-center py-4 capitalize text-gray-900">
						Server Error
					</h1>
				) : data && data.data.length > 0 ? (
					<Table data={data.data} columns={columns} />
				) : (
					<h1 className="text-3xl text-center py-4 capitalize text-gray-900 font-semibold">
						You have not listed any job
					</h1>
				)}
				{data && data.numPages > 1 && <Pagination pages={data?.numPages} />}
			</main>
		</>
	)
}

export default DashboardPage
