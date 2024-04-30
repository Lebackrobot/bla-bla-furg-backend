import express from 'express'
import signupRouter from './noauth/sinup.router.js'
import signinController from './noauth/signin.router.js'

const routes = (app) => {
    app.use(express.json())
    app.use('/noauth', signupRouter, signinController)
}

export { routes }