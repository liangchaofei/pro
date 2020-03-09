const moment = require('moment')

module.exports = (sequelize,DataTypes) => {
    return sequelize.define('xuan',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            allowNull:true,
            autoIncrement:true
        },
        company:{
            type:DataTypes.STRING,
            allowNull:false,
            field:'company'
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false,
            field:'name',
        },
        count:{
            type:DataTypes.FLOAT,
            allowNull:false,
            field:'count'
        },
        price:{
            type:DataTypes.FLOAT,
            allowNull:false,
            field:'price'
        },
        createdAt:{
            type:DataTypes.DATE
        },
        updatedAt:{
            type:DataTypes.DATE
        }
    },{
        /**
         * 如果为true，则表示名称和model相同，即user
         * 如果为fasle，mysql创建的表名称会是复数，即users
         * 如果指定的表名称本身就是复数，则形式不变
         */
        freezeTableName: true
    })
}