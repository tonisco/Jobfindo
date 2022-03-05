import React from "react"
import Moment from "react-moment"
import { Link } from "react-router-dom"
import { JobType } from "../types/types"

interface JobListItemProps {
	job: JobType
}

const JobListItem = ({ job }: JobListItemProps) => {
	return (
		<Link to={`/job/${job._id}`}>
			<div className="flex gap-2 cursor-pointer main">
				<img
					src={
						job.company.image
							? `http://localhost:5000/api/auth/image/${job.company.image}`
							: "/images/image.png"
					}
					className="h-20 w-20 object-contain mt-2"
					alt="company logo"
				/>
				<div className="capitalize border-y w-full py-2">
					<h1 className=" font-bold text-sky-800 line decoration-sky-800 decoration-2">
						{job.title}
					</h1>
					<h2>{job.company.name}</h2>
					<h3>{job.location}</h3>
					<h4 className="text-xs">currently recruiting</h4>
					<h4 className="text-xs normal-case space-x-2 mt-2">
						<span>
							<Moment fromNow>{job.createdAt}</Moment> -
						</span>
						<span className="text-sky-800">{job.total_applicants} applicants</span>
					</h4>
				</div>
			</div>
		</Link>
	)
}

export default JobListItem
