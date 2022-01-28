import { Schema, model } from "mongoose"
import { JobTypes } from "./types"

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
		application: [
			{
				full_name: { type: String, required: true },
				email: { type: String, required: true },
				location: { type: String, required: true },
				phone: { type: String, required: true },
				cv: { type: String, required: true },
			},
		],
		total_applicants: { type: Number, default: 0 },
	},
	{ timestamps: true }
)

const Job = model<JobTypes>("Job", JobSchema)

export default Job
