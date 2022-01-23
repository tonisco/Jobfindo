import { CompanyTypes } from "./db/types"

declare global {
	namespace Express {
		export interface Request {
			user: CompanyTypes
		}
	}
}
