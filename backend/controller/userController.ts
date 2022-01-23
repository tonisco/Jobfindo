import { RequestHandler } from "express"
import asyncHandler from "express-async-handler"
import createToken from "../auth/token"
import Company from "../db/companySchema"
import { CompanyInput } from "../db/types"

// desc: sign up a user
// route: POST /api/auth/register
//access: public
const register: RequestHandler<{}, {}, CompanyInput> = asyncHandler(async (req, res) => {
	try {
		const { companyDetails, email, image, name, numberOfEmployees, password } = req.body
		const exist = await Company.findOne({ email })
		if (exist) {
			res.status(400)
			throw new Error("Email already in use")
		}
		const company = await Company.create({
			companyDetails,
			email,
			image,
			name,
			numberOfEmployees,
			password,
		})
		const token = createToken(company._id)
		res.status(201).json({
			message: "User successfully created",
			data: { companyDetails, email, image, name, numberOfEmployees, token },
		})
	} catch (error) {
		const err = (error as Error).message
		throw new Error(err)
	}
})

// desc: log a user in
// route: /api/auth/login
// access: public
const login: RequestHandler<{}, {}, { email: string; password: string }> = asyncHandler(
	async (req, res, next) => {
		try {
			const { email, password } = req.body
			const company = await Company.findOne({ email })
			if (!company) {
				res.status(404)
				throw new Error("Wrong username or password")
			} else {
				if (!(await company.isValidPassword(password))) {
					res.status(404)
					throw new Error("Wrong username or password")
				} else {
					const token = createToken(company._id)
					const { companyDetails, email, image, name, numberOfEmployees } = company
					const data = { companyDetails, email, image, name, numberOfEmployees, token }
					res.status(200).json({
						message: "Login successful",
						data,
					})
				}
			}
		} catch (error) {
			next(error)
		}
	}
)

export { login, register }
