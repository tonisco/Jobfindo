import { Router } from "express"
import {
	addJob,
	getJobs,
	deleteJob,
	editJob,
	getJob,
	applyJob,
	companyJobs,
	companyJob,
	downloadCv,
} from "../controller/jobController"
import { isLoggedIn } from "../auth/auth"
import { upload } from "../controller/fileController"

const router = Router()

router.get("/", getJobs)

router.route("/company").get(isLoggedIn, companyJobs).post(isLoggedIn, addJob)

router
	.route("/company/:id")
	.get(isLoggedIn, companyJob)
	.post(isLoggedIn, editJob)
	.delete(isLoggedIn, deleteJob)

router.post("/apply/:id", upload.single("file"), applyJob)

router.get("/downloadcv/:name", downloadCv)

router.route("/:id").get(getJob)

export default router
