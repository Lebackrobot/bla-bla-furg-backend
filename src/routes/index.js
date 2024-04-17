import express from 'express'

import chatRouter from './chat-router.js'

const routes = (app) => {
    app.use(express.json())
    app.use(chatRouter)
}


export { routes }