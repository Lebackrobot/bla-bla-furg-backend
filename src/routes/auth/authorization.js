import jwt from 'jsonwebtoken'
import userService from '../../services/user/user.service.js'

const authorization = (request, response, next) => {
    const secretKey = process.env.JWT_SECRET_KEY
    const token = request.headers.authorization || request.headers.Authorization

    if (!token) {
        return response.status(401).send({ success: false, message: 'Token is required()'})
    }

    jwt.verify(token, secretKey, async(error, decoded) => {
        if (error) {
            return response.status(403).send({ success: false, message: error})
        }

        const user = await userService.getById(decoded.userId)

        if (!user) {
            return response.status(403).send({ success: false, message: 'Invalid token'})
        }

        request.user = user
        return next()
    })
}

export default authorization