import { Router } from "express"
import { isLoggedIn } from "../auth/auth"
import { upload } from "../controller/fileController"
import { editDetails, getImage, login, register } from "../controller/userController"

const router = Router()

router.post("/register", upload.single("image"), register)

router.post("/login", login)

router.get("/image/:name", getImage)

// @ts-ignore
router.post("/user", isLoggedIn, upload.single("image"), editDetails)

export default router
