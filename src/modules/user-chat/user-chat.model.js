import { DataTypes } from 'sequelize'
import { sequelize } from '../../../config/db-connect.js'
import userModel from '../users/user.model.js'
import chatModel from '../chats/chat.model.js'

const userChatModel = sequelize.define('users_chats', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    role: {
        type: DataTypes.ENUM('HOST', 'MEMBER'),
        allowNull: false        
    },

    createdAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        field: 'created_at',
        allowNUll: false
    },

    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        field: 'updated_at',
        allowNull: false
    }
})

userChatModel.belongsTo(userModel, { foreignKey: 'user_id'})
userChatModel.belongsTo(chatModel, { foreignKey: 'chat_id'})

export default userChatModel