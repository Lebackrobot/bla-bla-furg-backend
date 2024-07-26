import { Router } from "express";
import chatController from "../../controllers/chat/chat.controller.js";

const noAuthChatRouter = Router()

noAuthChatRouter.get('/chats', chatController.get)

export default noAuthChatRouter