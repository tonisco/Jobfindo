import React, { useEffect, useMemo, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Cell, Column } from "react-table"
import { useCompanyJobQuery } from "../app/api"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { logout } from "../app/slice"
import ApplicationDetails from "../components/subpage/ApplicationDetails"
import { ApplicationTypes, ErrorData } from "../components/types/types"
import Modal from "../components/ui/Modal"
import Spinner from "../components/ui/Spinner"
import Table from "../components/ui/Table"
import Toast, { toastError } from "../components/ui/Toast"

const ApplicationPage = () => {
	const { id } = useParams()
	const navigate = useNavigate()

	const [selected, setSelected] = useState("")
	const [application, setApplication] = useState<ApplicationTypes>()
	const [open, setOpen] = useState(true)

	const { data, error, isLoading, isError } = useCompanyJobQuery(id!, { skip: !id })

	const { user } = useAppSelector((state) => state.User)
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (!user) {
			navigate("/login")
		}
	}, [user, navigate])

	useEffect(() => {
		if (error) {
			let err = (error as ErrorData).data.message
			if (err === "Not authorized, token failed") {
				dispatch(logout())
			} else {
				toastError(err)
			}
		}
	}, [error, dispatch])

	useEffect(() => {
		if (selected && data) {
			const applied = data.application.find((item) => item._id === selected)
			if (applied) setApplication(applied)
			else toastError(`Application with id: ${selected} does not exist`)
		} else setApplication(undefined)
	}, [data, selected])

	const column = useMemo<Column<ApplicationTypes>[]>(
		() => [
			{ Header: "Name", accessor: "full_name" },
			{ Header: "Email", accessor: "email" },
			{ Header: "Phone", accessor: "phone" },
			{
				accessor: "_id",
				Cell: (row: Cell<ApplicationTypes>) => (
					<button
						className="text-xs sm:text-base px-1 sm:px-3 py-1 my-1 bg-sky-800 text-white cursor-pointer"
						onClick={() => {
							setSelected(row.row.original._id)
							setOpen(true)
						}}
					>
						DETAILS
					</button>
				),
			},
		],
		[]
	)

	return (
		<>
			{application && open && (
				<Modal setIsOpen={setOpen} isOpen={open}>
					<ApplicationDetails
						application={application}
						setIsOpen={setOpen}
						setSelected={setSelected}
					/>
				</Modal>
			)}
			<Toast />
			<main className="bg-white px-2 py-5 max-w-5xl mx-auto h-full w-full">
				{isLoading ? (
					<Spinner />
				) : isError ? (
					<h1 className="text-3xl text-center py-4 capitalize text-gray-900">
						Server Error
					</h1>
				) : data && data.total_applicants > 0 ? (
					<>
						<h1 className="text-3xl text-center py-4 capitalize text-gray-900 font-semibold">
							{data.title}
						</h1>
						<h3 className="text-xl text-center py-2 capitalize text-gray-900 font-semibold">
							total applicants: {data.total_applicants}
						</h3>
						<Table columns={column} data={data.application} />
					</>
				) : (
					<h1 className="text-3xl text-center py-4 capitalize text-gray-900 font-semibold">
						No one has applied yet
					</h1>
				)}
			</main>
		</>
	)
}

export default ApplicationPage
