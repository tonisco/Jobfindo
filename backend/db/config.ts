import moongoose from "mongoose"

const db = async () => {
	try {
		const connect = await moongoose.connect(process.env.MONGO_URI!)
		console.log(`db connected on ${connect.connection.host}`)
	} catch (error) {
		console.log(error)
		process.exit()
	}
}

export default db
