import { encryptPassword, verifyPassword } from '../../libraries/password-crypto.js'
import { chatCreateSchema, chatMemberSchema } from '../../modules/chats/chat.schema.js'
import chatService from '../../services/chat/chat.service.js'
import userChatService from '../../services/user-chat/user-chat.service.js'

let clients = []

const chatController = {
    getById: async (request, response) => {
        try {
            const { id } = request.params
            const chat = await chatService.getById(id)
        
            if (!chat) {
                return response.status(404).send({ success: false, message: 'chat not found'})
            }
    
            return response.status(200).send({ success: true, data: { chat }, message: 'Success to response chat'})
        }

        catch (error) {
            return response.status(500).send({ success: false, message: 'Internal server error' })
        }
    },

    create: async (request, response) => {
        try {
            const { error, value: payload } = chatCreateSchema.validate(request.body)
            const { user } = request

            if (error) {
                return response.status(400).send({ success: false, message: error.details })
            }

            if (payload.visibility == 'PUBLIC') {
                delete payload.password
            }

            if (payload.visibility == 'PRIVATE' && !payload.password) {
                return response.status(400).send({ success: false, message: 'Password is required'})
            }
            
            if (payload.visibility == 'PRIVATE' && payload.password) {
                payload.password = await encryptPassword(payload.password)
            }


            const chat = await chatService.create(payload)
            await userChatService.create({ user_id: user.id, chat_id: chat.id, role: 'HOST'})
            
            return response.status(200).send({ success: true, data: { chat }, message: 'Chat created' })
        }

        catch (error) {
            console.error(error)
            return response.status(500).send({ success: false, message: 'Internal server error'})
        }
    },

    addMember: async (request, response) => {
        try {
            const { error, value: payload } = chatMemberSchema.validate(request.body)
            const { user } = request
    
            if (error) {
                console.error(error)
                return response.status(400).send({ success: false, message: 'Bad request'})
            }
    
            const chat = await chatService.getById(payload.chatId)
    
            if (!chat) {
                return response.status(404).send({ success: false, message: 'Not found chat'})
            }

            const userChat = await userChatService.getByUserIdAndChatId(user.id, chat.id)

            if (userChat) {
                return response.status(409).send({ success: false, message: 'User alredy joined this chat'})
            }

            if (chat.visibility == 'PRIVATE' && !payload.password) {
                return response.status(400).send({ success: false, message: 'Password is required'})
            }
    
            if (chat.visibility == 'PRIVATE' && payload.password) {
                const authorizedPassword = await verifyPassword(payload.password, chat.password)
             
                if (!authorizedPassword) {
                    return response.status(401).send({ success: false, message: 'Invalid password'})
                }
            }
    
            await userChatService.create({ user_id: user.id, chat_id: payload.chatId, role: 'MEMBER'})
            return response.status(200).send({ success: true, message: 'Success to joined user'})
        }

        catch (error) {
            console.error(error)
            return response.status(500).send({ success: false, message: 'Internal server error'})
        }
    }
}

export default chatController