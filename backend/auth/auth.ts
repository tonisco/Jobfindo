import { RequestHandler } from "express"
import asyncHandler from "express-async-handler"
import jwt from "jsonwebtoken"
import { Types } from "mongoose"
import Company from "../db/companySchema"

type MyToken = {
	id: Types.ObjectId
	iat: number
	exp: number
}

const isLoggedIn: RequestHandler<{ user: null }> = asyncHandler(async (req, res, next) => {
	let token

	if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
		try {
			token = req.headers.authorization.split(" ")[1]

			const decoded = jwt.verify(token, process.env.JWT_SECRET!) as MyToken

			req.user = await Company.findById(decoded.id)
			next()
		} catch (error) {
			res.status(401)
			throw new Error("Not authorized, token failed")
		}
	}
	if (!token) {
		res.status(401)
		throw new Error("Not authorized, token failed")
	}
})

export { isLoggedIn }
