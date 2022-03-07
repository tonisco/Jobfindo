require("dotenv").config()
import express, { ErrorRequestHandler, RequestHandler } from "express"
import cors from "cors"
import db from "./db/config"
import jobRoute from "./routes/jobRoute"
import userRoute from "./routes/userRoute"
import path from "path"

const app = express()

app.use(cors())
app.use(express.json())

db()

const PORT = process.env.PORT || 5000
app.use((req, res, next) => {
	req.user = {}
	next()
})
app.use("/api/jobs", jobRoute)
app.use("/api/auth", userRoute)

app.get("/api", (req, res) => {
	res.json("Welcome")
})

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../frontend/build")))

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "../", "frontend", "build", "index.html"))
	})
}

const notFound: RequestHandler = (req, res, next) => {
	const error = new Error(`Not Found - ${req.originalUrl}`)
	res.status(404)
	next(error)
}

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
	const statusCode = res.statusCode === 200 ? 500 : res.statusCode
	res.status(statusCode)
	res.json({
		message: err.message,
		stack: process.env.NODE_ENV === "production" ? null : err.stack,
	})
	next()
}

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
	console.log(`App is listening on port ${PORT}`)
})
