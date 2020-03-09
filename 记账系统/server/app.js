const Koa = require('koa')
const mysql = require('mysql')
const bodyparser  = require('koa-bodyparser')
const router = require('koa-router')()
let app = new Koa()

let pool = mysql.createPool({
    hos:'127.0.0.1',
    user:'root',
    password:'123456',
    database:'nodesql'
})
let query = function(sql, values) {
    return new Promise((resolve, reject) => {
      pool.getConnection(function(err, connection) {
        if(err) {
          resolve(err);
        } else {
          connection.query(sql, values, (err, rows) => {
            if(err) {
              reject(err);
            } else {
              resolve(rows)
            }
            connection.release();
          })
        }
      })
    })
  };
  app.use(bodyparser())

router.get('/api/shop', async (ctx)=>{
    const {company, name,time} = ctx.request.query
    let data;
    if(company && name && time) {
      data = await query(`select * from xuan where company="${company}" and name = "${name}" and time="${time}" order by time desc`)
    }else if(name && time) {
        data = await query(`select * from xuan where name = "${name}" and time="${time}" order by time desc`)
    }else if(name && company) {
      data = await query(`select * from xuan where name = "${name}" and company="${company}" order by time desc`)
  }else if(time && company) {
    data = await query(`select * from xuan where time = "${time}" and company="${company}" order by time desc`)
}else if(time){
        data = await query(`select * from xuan where time="${time}" order by time desc`)
      
    }else if(name){
        data = await query(`select * from xuan where name = "${name}" order by time desc`)
    }else if(company){
      data = await query(`select * from xuan where company = "${company}" order by time desc`)
  }else{
        data = await query('select * from xuan order by time desc')
    }
    // console.log(JSON.stringify(data))
    ctx.body = data
})


router.post('/api/shop', async ctx=>{
    let {name,price,count,time,company} = ctx.request.body;
    let data =await query(`insert into xuan (company,name,price,count,time) values ("${company}","${name}",${price},${count},"${time}"); `)
    ctx.body = {
        'code':200,
        'msg':'success'
    }
})

router.put('/api/shop', async ctx => {
    let {company,name,price,count,time,id} = ctx.request.body;
    let data =await query(`update xuan set company="${company}", name = "${name}",price=${price},count=${count},time="${time}" where id=${id} `)
    ctx.body = {
        'code':200,
        'msg':'success'
    }
})

router.delete('/api/shop',async ctx=>{
    const { id } = ctx.request.query
    await query(`delete from xuan where id = ${id}`);
    ctx.body = {
        'code':200,
        'msg':'success'
    }
})

app.use(router.routes())
app.listen(9090)