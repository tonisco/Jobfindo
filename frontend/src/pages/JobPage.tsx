import React, { useEffect, useState } from "react"
import { Link, useParams, useSearchParams } from "react-router-dom"
import JobsList from "../components/subpage/JobsList"
import JobDetails from "../components/subpage/JobDetails"
import Modal from "../components/ui/Modal"
import ApplyForm from "../components/form/ApplyForm"
import { useGetAllJobsQuery } from "../app/api"
import Toast, { toastError } from "../components/ui/Toast"
import { ErrorData } from "../components/types/types"
import Spinner from "../components/ui/Spinner"
import { useAppSelector } from "../app/hooks"

const JobPage = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [show, setShow] = useState("All")
	const [matches, setMatches] = useState(window.matchMedia("(max-width:767px)").matches)
	const [search, setSearch] = useState<string>()
	const [page, setPage] = useState<string>()

	const { user } = useAppSelector((state) => state.User)

	const { id } = useParams()

	const [searchParams] = useSearchParams()

	const { data, isLoading, isError, error, isFetching } = useGetAllJobsQuery({ s: search, page })

	useEffect(() => {
		const match = () => setMatches(window.matchMedia("(max-width:767px)").matches)
		window.addEventListener("resize", match)
		if (matches) {
			if (id) {
				setShow("Detail")
			} else {
				setShow("List")
			}
		} else {
			setShow("All")
		}
		return () => window.removeEventListener("resize", match)
	}, [id, matches])

	useEffect(() => {
		const s = searchParams.get("s")
		const page = searchParams.get("page")
		if (s) setSearch(s)
		else setSearch(undefined)

		if (page) setPage(page)
		else setPage(undefined)
	}, [searchParams])

	useEffect(() => {
		if (error) {
			toastError((error as ErrorData)?.data?.message)
		}
	}, [error])

	return (
		<>
			<Toast />
			<Modal isOpen={isOpen} setIsOpen={setIsOpen}>
				{data && <ApplyForm setIsOpen={setIsOpen} id={id ? id : data?.data[0]?._id} />}
			</Modal>
			{user && (
				<div className="max-w-5xl px-4 pt-2 mx-auto bg-white w-full block sm:hidden">
					<Link className="text-lg font-bold text-rose-500 underline" to="/dashboard">
						To Dashboard
					</Link>
				</div>
			)}
			<div
				className={`max-w-5xl mx-auto flex w-full ${
					user ? "h-[84.8vh] sm:h-[88.5vh]" : "h-[88.5vh]"
				}`}
			>
				{isLoading || isFetching ? (
					<Spinner />
				) : isError ? (
					<h1 className="text-center text-2xl">Server Error </h1>
				) : data && data.totalJobs > 0 ? (
					<>
						{(show === "All" || show === "List") && <JobsList data={data} />}
						{(show === "All" || show === "Detail") && (
							<JobDetails setIsOpen={setIsOpen} job={data.data[0]._id} />
						)}
					</>
				) : (
					<h1 className="text-center text-4xl capitalize w-full pt-10 ">
						{search ? `No Job matches ${search}` : "There are no available Jobs"}
					</h1>
				)}
			</div>
		</>
	)
}

export default JobPage
