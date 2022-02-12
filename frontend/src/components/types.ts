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
	full_name: string
	email: string
	address: string
	phone: string
	cv: string
	createdAt: Date
	updatedAt: Date
	cover_letter: string
	_id: string
}

export interface JobType extends JobInput {
	company: CompanyType
	application: ApplicationTypes[]
	total_applicants: number
	createdAt: Date
	updatedAt: Date
	_id: string
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

export interface ErrorData {
	data: {
		message: string
	}
}
