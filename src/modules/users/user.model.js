import { DataTypes } from 'sequelize'
import { sequelize } from '../../../config/db-connect.js'

const userModel = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nickname: {
        type: DataTypes.STRING,
        field: 'nickname',
        allowNUll: false
    },

    email: {
        type: DataTypes.STRING,
    },

    password: {
        type: DataTypes.STRING,
        field: 'password',
        allowNull: false
    },

    createdAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        field: 'created_at',
        allowNull: false
    },

    updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at',
        onUpdate: sequelize.literal('CURRENT_TIMESTAMP')
    }
})

export default userModel