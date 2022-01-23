import { Document, Types } from "mongoose"

export interface CompanyInput {
	name: string
	email: string
	password: string
	image: string
	numberOfEmployees: string
	companyDetails: string
}

export interface JobInput {
	title: string
	location: string
	type: string
	description: string
	pay_range: string
	length: string
	level: string
	applicationDeadline: Date
}

export interface CompanyTypes extends CompanyInput, Document {
	isValidPassword: (password: string) => Promise<Error | boolean>
}

export interface ApplicationTypes {
	job: Types.ObjectId
	full_name: string
	email: string
	location: string
	phone: string
	cv: string
}

export interface JobTypes extends JobInput, Document {
	company: Types.ObjectId
	applications: ApplicationTypes[]
	total_applicants: number
}
