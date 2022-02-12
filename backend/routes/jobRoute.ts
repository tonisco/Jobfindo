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

router.route("/").get(getJobs).post(isLoggedIn, addJob)

router.get("/company", isLoggedIn, companyJobs)

router.get("/company/:id", isLoggedIn, companyJob)

router.post("/apply/:id", upload.single("file"), applyJob)

router.get("/downloadcv/:name", isLoggedIn, downloadCv)

router.route("/:id").post(isLoggedIn, editJob).get(getJob).delete(isLoggedIn, deleteJob)

export default router

// added back(grid fs, routes, schema), front(api,form,app. det, connect to redux,spinner,table re-use,page)
