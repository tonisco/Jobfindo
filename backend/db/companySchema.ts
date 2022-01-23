import { model, Schema } from "mongoose"
import bcrypt from "bcryptjs"
import { CompanyTypes } from "./types"
const CompanySchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
		},
		image: String,
		numberOfEmployees: {
			type: String,
			required: true,
		},
		companyDetails: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
)

CompanySchema.pre<CompanyTypes>("save", async function (next) {
	if (!this.isModified("password")) {
		return next()
	}

	const salt = await bcrypt.genSalt(10)
	this.password = await bcrypt.hash(this.password, salt)
	next()
})

CompanySchema.methods.isValidPassword = async function (
	enteredPassword: string
): Promise<Error | boolean> {
	return await bcrypt.compare(enteredPassword, this.password)
}

const Company = model<CompanyTypes>("Company", CompanySchema)

export default Company
