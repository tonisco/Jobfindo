import { RequestHandler } from "express"
import asyncHandler from "express-async-handler"
import { cvBucket } from "../db/config"
import Job from "../db/jobsSchema"
import { ApplicationTypes, JobInput, JobTypes } from "../db/types"

// desc: get all jobs
// route: GET /api/jobs
// access: public
const getJobs: RequestHandler = asyncHandler(async (req, res) => {
	try {
		const job = await Job.find().sort({ createdAt: "desc" }).populate("company", "-password")
		res.status(200).json({ data: job })
	} catch (error) {
		let e = (error as Error).message
		res.status(500)
		throw new Error(e)
	}
})

// desc get single job
// route get /api/jobs/:id
//access: public
const getJob: RequestHandler<{ id: string }> = asyncHandler(async (req, res) => {
	try {
		const { id } = req.params
		const job = await Job.findById(id).populate("company", "-password")
		if (!job) {
			res.status(404)
			throw new Error("Job not found")
		}
		res.json({ data: job })
	} catch (error) {
		let err = (error as Error).message
		res.status(500)
		throw new Error(err)
	}
})

// desc: create a job
// route: Post /api/jobs
// access: private
const addJob: RequestHandler<{}, {}, JobInput> = asyncHandler(async (req, res) => {
	try {
		const {
			description,
			length,
			level,
			location,
			pay_range,
			title,
			type,
			applicationDeadline,
		} = req.body
		const job = await Job.create({
			description,
			length,
			level,
			location,
			pay_range,
			title,
			type,
			applicationDeadline,
			company: req.user._id,
		})
		res.status(200).json({ message: "Job successfully created" })
	} catch (error) {
		let e = (error as Error).message
		res.status(500)
		throw new Error(e)
	}
})

// desc: edit a job
// route: POST /api/jobs/:id
// access private
const editJob: RequestHandler<any, {}, JobInput> = asyncHandler(async (req, res) => {
	const { id } = req.params
	try {
		const job = await Job.findById(id)
		if (!job) {
			res.status(404)
			throw new Error(`Job with id-${id} does not exist`)
		}
		const {
			description,
			length,
			level,
			location,
			pay_range,
			title,
			type,
			applicationDeadline,
		} = req.body
		job.description = description
		job.length = length
		job.level = level
		job.location = location
		job.pay_range = pay_range
		job.title = title
		job.applicationDeadline = applicationDeadline
		job.type = type
		job.save()
		res.status(200).json({ message: "Job successfully edited" })
	} catch (error) {
		let err = (error as Error).message
		res.status(500)
		throw new Error(err)
	}
})

//desc: delete a job
//route: Delete /api/jobs/:id
//access private
const deleteJob: RequestHandler<any> = asyncHandler(async (req, res) => {
	const id: string = req.params.id
	try {
		const job = await Job.findById(id)
		if (!job) {
			res.status(404)
			throw new Error(`Job with id-${id} does not exist`)
		}
		await job.delete()
		res.status(200).json({ message: "Job successfully deleted" })
	} catch (error) {
		throw new Error("Failed to delete the job")
	}
})

//desc: apply for job
// route: post /api/jobs/apply/:id
// access public
const applyJob: RequestHandler<{ id: string }, {}, ApplicationTypes> = asyncHandler(
	async (req, res) => {
		try {
			const { id } = req.params
			const { email, full_name, address, phone, cover_letter } = req.body
			const jobs = await Job.findById(id)
			if (!jobs) {
				res.status(404)
				throw new Error(`Job with id-${id} does not exist`)
			}
			const cv = req.file!.filename
			jobs.application.push({ cv, email, full_name, address, phone, cover_letter })
			jobs.total_applicants = jobs.total_applicants + 1
			jobs.save()
			res.status(200).json({ message: "Application successful" })
		} catch (error) {
			const err = (error as Error).message
			throw new Error(err)
		}
	}
)

//desc: get company job post
//route: GET /api/jobs/company
//access private
const companyJobs: RequestHandler<{}> = asyncHandler(async (req, res) => {
	try {
		const jobs = await Job.find({ company: req.user })
		res.status(200).json({ data: jobs })
	} catch (error) {
		const err = (error as Error).message
		res.status(500)
		throw new Error(err)
	}
})

//desc: get company job post
//route: GET /api/jobs/company/:id
//access private
const companyJob: RequestHandler<any> = asyncHandler(async (req, res) => {
	try {
		const job = await Job.findOne({ company: req.user, _id: req.params.id })
		if (!job) {
			res.status(404)
			throw new Error("Job not found")
		}
		res.status(200).json({ data: job })
	} catch (error) {
		const err = (error as Error).message
		res.status(500)
		throw new Error(err)
	}
})

// desc: download CV
// route: /api/jobs/downloadcv/:name
// access: private
const downloadCv: RequestHandler<any> = asyncHandler(async (req, res) => {
	try {
		const file = await cvBucket.find({ filename: req.params.name }).toArray()
		if (!file || file.length === 0) {
			res.status(404)
			throw new Error("Cv not found")
		} else cvBucket.openDownloadStreamByName(req.params.name).pipe(res)
	} catch (error) {
		res.status(500)
		throw new Error("Server error")
	}
})

export {
	getJobs,
	addJob,
	deleteJob,
	getJob,
	editJob,
	applyJob,
	companyJobs,
	companyJob,
	downloadCv,
}
