import { GridFSBucket } from "mongodb"
import mongoose from "mongoose"

let imageBucket: GridFSBucket
let cvBucket: GridFSBucket

const db = async () => {
	try {
		const connect = await mongoose.connect(process.env.MONGO_URI!)
		console.log(`db connected on ${connect.connection.host}`)
	} catch (error) {
		console.log(error)
		process.exit()
	}
}

mongoose.connection.on("connected", () => {
	const db = mongoose.connections[0].db
	imageBucket = new mongoose.mongo.GridFSBucket(db, { bucketName: "images" })
	cvBucket = new mongoose.mongo.GridFSBucket(db, { bucketName: "cvs" })
})

export { imageBucket, cvBucket }
export default db
