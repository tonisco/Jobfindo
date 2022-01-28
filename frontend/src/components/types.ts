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

export interface CompanyType {
	name: string
	email: string
	password: string
	image: string
	numberOfEmployees: string
	companyDetails: string
	createdAt: Date
	updatedAt: Date
	_id: string
}

export interface ApplicationTypes {
	job: string
	full_name: string
	email: string
	location: string
	phone: string
	cv: string
}

export interface JobType extends JobInput {
	company: CompanyType
	application: ApplicationTypes[]
	total_applicants: number
	createdAt: Date
	updatedAt: Date
	_id: "61edcdd8ec921f8e5fa7fcf6"
}

export interface UserDetails {
	companyDetails?: string
	email?: string
	image?: string
	name?: string
	numberOfEmployees?: string
	token?: string
}

export interface LoginInput {
	email: string
	password: string
}

export interface SignupInput {
	name: string
	email: string
	password: string
	image: string
	numberOfEmployees: string
	companyDetails: string
}
