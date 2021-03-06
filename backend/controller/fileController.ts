import multer from "multer"
import { GridFsStorage } from "multer-gridfs-storage"
import crypto from "crypto"
import path from "path"

const storage = new GridFsStorage({
	url: process.env.MONGO_URI!,
	file: (req, file) => {
		return new Promise((resolve, reject) => {
			crypto.randomBytes(4, (err, buf) => {
				if (err) {
					return reject(err)
				}
				const fileNames = file.originalname.split(".")
				const fileExt = fileNames[1]
				const imageExt = /jpg|jpeg|png|svg/
				const bucketName = imageExt.test(fileExt) ? "images" : "cvs"
				const filename =
					fileNames[0] + "_" + buf.toString("hex") + path.extname(file.originalname)
				const fileInfo = { filename, bucketName }
				resolve(fileInfo)
			})
		})
	},
})

const upload = multer({ storage })

export { upload }
