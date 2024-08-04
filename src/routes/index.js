import authorizationMiddleware from '../middlewares/authorization.middleware.js'
import authMessageRouter from './auth/message.router.js'
import authRoomRouter from './auth/room.router.js'
import noauthRoomRouter from './noauth/room.router.js'
import signRouter from './noauth/sign.router.js'

const routes = (app) => {

    const noauthRouters = [signRouter, noauthRoomRouter]
    const authRouters = [authRoomRouter, authMessageRouter]

    app.use('/noauth', ...noauthRouters)
    app.use('/auth', authorizationMiddleware, ...authRouters)
    
}

export { routes }