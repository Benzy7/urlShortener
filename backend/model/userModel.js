const Sequelize = require('../connection/db')

const {DataTypes, Model} = require('sequelize')

class User extends Model{}

User.init({
    id: {type:DataTypes.INTEGER, unique: true, allowNull: false, primaryKey: true, autoIncrement: true},
    username: {type:DataTypes.STRING, allowNull: false},
    password: {type:DataTypes.STRING, allowNull: false},
    email: {type:DataTypes.STRING, allowNull: false}
},{
    modelName: "user_table",
    sequelize: Sequelize,
    tableName: "user_table",
    timestamps: false
})

module.exports = User