export interface JobInput {
	title: string
	location: string
	type: string
	description: string
	pay_range: string
	length: string
	level: string
	applicationDeadline: string
}

interface Dates {
	createdAt: Date
	updatedAt: Date
}

export interface Company {
	name: string
	numberOfEmployees: string
	companyDetails: string
	image: File
}

interface EmailPassword {
	email: string
	password: string
}

export interface CompanyType extends Company, Dates {
	email: string
	_id: string
}

export interface ApplicationTypes extends Dates {
	full_name: string
	email: string
	address: string
	phone: string
	cv: File
	cover_letter: string
	_id: string
}

export interface JobType extends JobInput, Dates {
	company: CompanyType
	application: ApplicationTypes[]
	total_applicants: number
	_id: string
}

export interface UserDetails extends Company {
	email: string
	token: string
}

export interface LoginInput extends EmailPassword {}

export interface SignupInput extends Company, EmailPassword {}

export interface ErrorData {
	data: {
		message: string
	}
}

export interface JobData {
	data: JobType[]
	numPages: number
	totalJobs: 3
}
