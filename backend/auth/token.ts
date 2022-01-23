import jwt from "jsonwebtoken"
const createToken = (id: string) => jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: "2d" })

export default createToken
