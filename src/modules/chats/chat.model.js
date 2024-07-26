import { DataTypes } from 'sequelize'
import { sequelize } from '../../../config/db-connect.js'
import messageModel from '../messages/message.model.js'


const chatModel = sequelize.define('chats', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    type: {
        type: DataTypes.ENUM('STUDY', 'NOTIFY', 'FUN'),
        allowNull: false
    },

    visibility: {
        type: DataTypes.ENUM('PUBLIC', 'PRIVATE'),
        allowNull: false
    },

    title: {
        type: DataTypes.STRING,
        allowNull: false
    },

    description: {
        type: DataTypes.STRING,
        allowNull: false
    },

    password: {
        type: DataTypes.STRING,
        allowNull: true
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

chatModel.hasMany(messageModel, { foreignKey: 'chat_id' })
messageModel.belongsTo(chatModel, { foreignKey: 'chat_id' })

export default chatModel