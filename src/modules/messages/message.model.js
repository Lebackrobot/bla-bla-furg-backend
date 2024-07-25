import { DataTypes } from 'sequelize'
import { sequelize } from '../../../config/db-connect.js'
import userModel from '../users/user.model.js'
/* import chatModel from '../chats/chat.model.js' */

const messageModel = sequelize.define('messages', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    createdAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        field: 'created_at',
        allowNull: false
    },

    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        field: 'updated_at',
        allowNull: false
    }
})

messageModel.belongsTo(userModel, { foreignKey: 'user_id'})
/* messageModel.belongsTo(chatModel, { foreignKey: 'chat_id'}) */

export default messageModel