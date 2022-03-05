import React, { Dispatch, useEffect, useState } from "react"
import { BsBriefcase } from "react-icons/bs"
import { FaRegBuilding } from "react-icons/fa"
import parse from "html-react-parser"
import { useGetJobByIdQuery } from "../../app/api"
import { useParams } from "react-router-dom"
import Toast, { toastError } from "../ui/Toast"
import { ErrorData } from "../types/types"
import Spinner from "../ui/Spinner"
import Moment from "react-moment"

interface JobDetailsProps {
	setIsOpen: Dispatch<boolean>
	job: string
}

const JobDetails = ({ setIsOpen, job }: JobDetailsProps) => {
	const [id, setId] = useState<string>()
	const [hasExpired, setHasExpired] = useState<boolean>(true)

	const { data, isLoading, error, isError } = useGetJobByIdQuery(id, { skip: !id })

	const params = useParams()

	useEffect(() => {
		let jobId = params.id
		if (!jobId) {
			if (job) {
				setId(job)
			}
		} else {
			setId(jobId)
		}
	}, [job, params.id])

	useEffect(() => {
		if (error) {
			toastError((error as ErrorData).data.message)
		}
	}, [error])

	useEffect(() => {
		const currentDate = new Date().getTime() / 1000
		if (data) {
			if (data.applicationDeadline) {
				let expireDate = new Date(data.applicationDeadline).getTime() / 1000
				setHasExpired(currentDate > expireDate)
			} else {
				setHasExpired(false)
			}
		}
	}, [data])

	return (
		<>
			<Toast />
			<div className="bg-white capitalize px-6 md:px-3 py-6 space-y-4 h-full w-full md:w-[60%] overflow-y-scroll text-gray-900 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-200">
				{isLoading ? (
					<Spinner />
				) : isError ? (
					<h1 className="text-center text-2xl">Job does not exist </h1>
				) : (
					data && (
						<>
							<div className="mb-3 space-y-2">
								<h1 className="text-xl font-bold">{data?.title}</h1>
								<h3 className="">
									{data?.company.name} - {data?.location} ({data?.type})
								</h3>
							</div>
							<div className="text-sm space-y-3">
								<div className="normal-case text-sm">
									<span>
										<Moment fromNow>{data.createdAt}</Moment> -
									</span>
									<span className="text-sky-800">
										{" "}
										{data?.total_applicants} applicants
									</span>
								</div>
								<div className="flex gap-2 items-center">
									<BsBriefcase />{" "}
									<p>
										{data?.length} - {data?.level}
									</p>
								</div>
								<div className="flex gap-2 items-center">
									<FaRegBuilding />
									<p>{data?.company.numberOfEmployees} employees</p>
								</div>
								<p className="pt-2 text-base">
									{hasExpired ? "Job expired" : "currently recruiting"}
								</p>
							</div>
							{!hasExpired && (
								<div className="flex gap-4">
									<button
										className="capitalize bg-sky-800 hover:bg-sky-900 py-1 px-3 rounded-lg text-white shadow-md"
										onClick={() => setIsOpen(true)}
									>
										apply
									</button>
									<button className="capitalize hover:bg-sky-100 border border-sky-800 text-sky-800 py-1 px-3 rounded-lg shadow-md">
										save
									</button>
								</div>
							)}
							<div className="py-2 space-y-2 normal-case tracking-wide flex flex-col gap-2">
								<div className="details w-full max-w-[95%]">
									{parse(data.description)}
								</div>
								<div className="space-y-3 mt-4">
									<h1 className="font-bold text-xl">About the Company</h1>
									<div className="flex gap-3 items-center text-lg capitalize">
										<img
											className="h-20 w-20 object-contain"
											src={
												data.company.image
													? `http://localhost:5000/api/auth/image/${data.company.image}`
													: "/images/image.png"
											}
											alt="company logo"
										/>
										<h3 className="font-bold">{data.company.name}</h3>
									</div>
									<div className="space-y-2 ">
										<h4>
											Staff and Recruiting - {data.company.numberOfEmployees}{" "}
											employees
										</h4>
										<p>{data.company.companyDetails}</p>
									</div>
								</div>
							</div>
						</>
					)
				)}
			</div>
		</>
	)
}

export default JobDetails
