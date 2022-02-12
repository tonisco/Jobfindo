import { Schema, model } from "mongoose"
import { string } from "zod"
import { JobTypes } from "./types"

const ApplicationSchema = new Schema(
	{
		full_name: { type: String, required: true },
		email: { type: String, required: true },
		address: { type: String, required: true },
		phone: { type: String, required: true },
		cover_letter: { type: String, default: "" },
		cv: { type: String },
	},
	{ timestamps: true }
)

const JobSchema = new Schema(
	{
		company: {
			ref: "Company",
			type: Schema.Types.ObjectId,
		},
		title: { type: String, required: true },
		location: { type: String, required: true },
		type: { type: String, required: true },
		description: { type: String, required: true },
		pay_range: { type: String, required: true },
		length: { type: String, required: true },
		level: { type: String, required: true },
		applicationDeadline: { type: Date },
		application: [ApplicationSchema],
		total_applicants: { type: Number, default: 0 },
	},
	{ timestamps: true }
)

const Job = model<JobTypes>("Job", JobSchema)

export default Job
