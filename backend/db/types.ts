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
	full_name: string
	email: string
	address: string
	phone: string
	cv: string
	cover_letter: string
}

export interface JobTypes extends JobInput, Document {
	company: Types.ObjectId
	application: ApplicationTypes[]
	total_applicants: number
}
