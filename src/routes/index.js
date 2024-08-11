import authorizationMiddleware from '../middlewares/authorization.middleware.js'
import authEventStreamRouter from './auth/event-stream.router.js'
import authMessageRouter from './auth/message.router.js'
import authRoomRouter from './auth/room.router.js'
import noatuhPictureSeedRouter from './noauth/picture-seed.router.js'
import noauthRoomRouter from './noauth/room.router.js'
import signRouter from './noauth/sign.router.js'
import noauthUserRouter from './noauth/user.router.js'

const routes = (app) => {

    const noauthRouters = [signRouter, noauthRoomRouter, noauthUserRouter, noatuhPictureSeedRouter]
    const authRouters = [authRoomRouter, authMessageRouter, authEventStreamRouter]

    app.use('/noauth', ...noauthRouters)
    app.use('/auth', authorizationMiddleware, ...authRouters)
    
}

export { routes }