import express from 'express'
import signupRouter from './noauth/sinup.router.js'
import authorization from './auth/authorization.js'
import signinRouter from './noauth/signin.router.js'
import chatRouter from './auth/chat.router.js'
import messageRouter from './auth/message.router.js'
import eventStreamRouter from './auth/event-stream.router.js'

const routes = (app) => {
    app.use(express.json())

    app.use('/auth', authorization, chatRouter, messageRouter, eventStreamRouter)
    app.use('/noauth', signupRouter, signinRouter)
}

export { routes }