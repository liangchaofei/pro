const Router = require('koa-router')
const ArtileController = require('../controllers/article');
const uploadimgMulter = require('../controllers/article')
const router = new Router({
  prefix: '/api/v1'
});
//创建
router.post('/article/create',ArtileController.create);
// 获取
router.get('/article',ArtileController.getArticle)
// 删除
router.delete('/article/:id',ArtileController.delete)
// 修改
router.put('/article/create',ArtileController.fixArticle)


// 上传图片
router.post('/uploadimg',ArtileController.uploadimgMulter,ArtileController.uploadImg)
router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})


router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
