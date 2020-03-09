// 引入mysql的配置文件
const db = require('../config/db')
// 引入sequelize对象
const Sequelize = db.sequelize;
// 引入数据表模型
const Xuan = Sequelize.import('../schema/article.js')
Xuan.sync({force:false})//自动创建表

class XuanModel {
    /**
     * 创建: 
     * @param {type} 
     * @return: 
     */    

     static async create(data){
         console.log('data',data)
         return await Xuan.create({
             company:data.company,
             name:data.name,
             price:data.price,
             count:data.count
         })
     }

    /**
     * get: 
     * @param {type} 
     * @return: 
     */     

     static async getArticle(query){
         return await Xuan.findAll({
             where:{
                 ...query
             }
         })
     }

    /**
     * delete: 
     * @param {type} 
     * @return: 
     */     

     static async deleteArticle(id){
         return await Xuan.destroy({
             where:{
                 id
             }
         })
     }

    /**
     * 更新: 
     * @param {type} 
     * @return: 
     */     

     static async fixArticle(data){
         return await Xuan.update({
             company:data.company,
             name:data.name,
             count:data.count,
             price:data.price,
         },{
             where:{
                 id:data.id
             }
         })
     }


    /**
     * 上传图片: 
     * @param {type} 
     * @return: 
     */     

  
}


module.exports = XuanModel
