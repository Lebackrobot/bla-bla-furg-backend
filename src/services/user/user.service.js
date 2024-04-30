import  userModel from '../../modules/users/user.model.js'

const userService = {
    getByEmail: async (email) => {
        const query = await userModel.findOne({ where: { email: email } })
        return query ? query.dataValues : undefined
    },

    getByNickname: async(nickname) => {
        const query = await userModel.findOne({ where: { nickname: nickname }})
        return query ? query.dataValues : undefined

    },

    createUser: async (user) => {  
        const query = await userModel.create(user) 
        return query ? query.dataValues : undefined

    }
}

export default userService