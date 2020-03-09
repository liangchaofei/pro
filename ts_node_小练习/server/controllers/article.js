const XuanModel = require('../modules/article')
const multer = require('koa-multer');

class xuanController {
    /**
     * 创建文章: 
     * @param {type} 
     * @return: 
     */    

     static async create(ctx){
         console.log('ctx',ctx)
         let req = ctx.request.body;
         console.log('req',req)
         if(req.company && req.name && req.price && req.count){
             try{
                let data = await XuanModel.create(req)
                ctx.response.status = 200
                ctx.body = {
                    code:200,
                    msg:'success',
                    data
                }
             }catch(err){
                ctx.response.status = 412
                ctx.body = {
                    code:412,
                    msg:'error',
                    err
                }
             }
         }else{
            ctx.response.status = 416
            ctx.body = {
                code:412,
                msg:'参数不全',
            }
         }
     }



    /**
     * 获取所有: 
     * @param {type} 
     * @return: 
     */     


     static async getArticle(ctx){
         const {query } = ctx.request;
         try{
            let data = await XuanModel.getArticle(query)
            ctx.response.status = 200;
             ctx.body = {
                 code:200,
                 msg:'success',
                 data
             }
         }catch(err){
             ctx.response.status = 412;
             ctx.body = {
                 code:412,
                 msg:'err',
                 err
             }
         }

     }

    /**
     * delete: 
     * @param {type} 
     * @return: 
     */    
    
     static async delete(ctx){
         let id = ctx.params.id;
         if(id){
            try{
                let data = await XuanModel.deleteArticle(id)
                ctx.response.status = 200;
                ctx.body = {
                    code:200,
                    msg:'success',
                }
            }catch(err){
                ctx.response.status = 412;
                ctx.body = {
                    code:412,
                    msg:'err',
                    err
                }
            }
         }else{
             ctx.response.status = 416;
             ctx.body = {
                 code:416,
                 msg:'缺少id',
             }
         }
     }

    /**
     * 修改: 
     * @param {type} 
     * @return: 
     */    
    
     static async fixArticle(ctx){
         let req = ctx.request.body;
         if(req.company || req.name || req.price || req.count ){
            try{
                let data = await XuanModel.fixArticle(req)
                ctx.response.status= 200
                ctx.body = {
                    code:20,
                    msg:'success'
                }
            }catch(err){
                ctx.response.status = 412;
                ctx.body = {
                    code:412,
                    msg:'erros'
                }
            }
         }
     }


    /**
     * 上传图片: 
     * @param {type} 
     * @return: 
     */     
    
    static  uploadimgMulter(){
        console.log('111111')
        //配置
        let storage = multer.diskStorage({
            //文件保存路径
            destination:(req,file,cb) =>{
                cb(null,'public/uoloads/')
            },
            // 修改文件名称
            filename:(req,file,cb) => {
                var fileFormat = (file.originlname).split('.')
                cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);
            }
        })

        // 加载配置
        var upload = multer({storage})
        return  upload.single('face')
    }

    static async uploadImg(ctx){
        console.log('ctx',ctx)
        let req = ctx.request.body;
        ctx.body = {
            filename: ctx.request.file.filename,//返回文件名
            body:ctx.request.body
        }
    }
}

module.exports = xuanController