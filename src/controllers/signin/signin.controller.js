
import jwt from 'jsonwebtoken'
import { verifyPassword } from '../../libraries/password-crypto.js'
import userService from './../../services/user/user.service.js'



export default {
    signin: async (request, response) => {
        try {
            const { email, password } =  request.body

            if (!email || !password) {
                return response.status(400).send({ success: false, message: 'Email e senha são obrigatórios.'})
            }
            
            const user = await userService.getByEmail(email)
            
            if (!user) {
                return response.status(404).send({ success: false, message: 'Usuário não encontrado.'})
                
            }
            
            const authorizedPassword = await verifyPassword(password, user.password)
            
            if (!authorizedPassword) {
                return response.status(401).send({ success: false, message: 'Senha inválida.' })
            }
            
            const secretKey = process.env.JWT_SECRET_KEY
            const token = jwt.sign({ userId: user.id }, secretKey);

            return response.status(200).send({ success: true, data: { token }, message: 'Sucesso no login.'})
        }   
        
        catch (error) {
            console.error(error)
            return response.status(500).send({ success: false, message: 'Erro interno no servidor.'})
        }
    }
}