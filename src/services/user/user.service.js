import  userModel from '../../modules/users/user.model.js'

const userService = {
    getById: async (id) => {
        const query = await userModel.findByPk(id) 
        return query ? query.dataValues : undefined
    },

    getByEmail: async (email) => {
        const query = await userModel.findOne({ where: { email: email } })
        return query ? query.dataValues : undefined
    },

    getByNickname: async(nickname) => {
        const query = await userModel.findOne({ where: { nickname: nickname }})
        return query ? query.dataValues : undefined

    },

    create: async (user) => {  
        const query = await userModel.create(user) 
        return query ? query.dataValues : undefined

    }
}

export default userService