import { Router } from "express"
import {
	addJob,
	getJobs,
	deleteJob,
	editJob,
	getJob,
	applyJob,
	companyJobs,
} from "../controller/jobController"
import { isLoggedIn } from "../auth/auth"

const router = Router()

router.route("/").get(getJobs).post(isLoggedIn, addJob)

router.get("/company", isLoggedIn, companyJobs)

router.post("/apply/:id", applyJob)

router.route("/:id").post(isLoggedIn, editJob).get(getJob).delete(isLoggedIn, deleteJob)

export default router
