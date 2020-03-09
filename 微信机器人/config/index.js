// 配置文件
module.exports = {
    // 每日说配置项（必填项）
    NAME: '小师妹', //女朋友备注姓名
    NICKNAME: '玉青', //女朋友昵称
    MEMORIAL_DAY: '2017/03/01', //你和女朋友的纪念日
    CITY: '大连', //女朋友所在城市（城市名称，不要带“市”）
    SENDDATE: '0 03 9 * * *', //定时发送时间 每天8点06分0秒发送，规则见 /schedule/index.js
    
    //高级功能配置项（非必填项）
    AUTOREPLY: true, //自动聊天功能 默认关闭 开启设置为: true
    DEFAULTBOT: '0', //设置默认聊天机器人 0 天行机器人 1 图灵机器人 2 天行对接的图灵机器人，需要到天行机器人官网充值（50元/年，每天500次）
    AUTOREPLYPERSON: ['好友1备注','好友2备注'], //指定多个好友开启机器人聊天功能   指定好友的备注，最好不要带有特殊字符
    TULINGKEY: '图灵机器人apikey',//图灵机器人apikey,需要自己到图灵机器人官网申请，并且需要认证
    TXAPIKEY: '天行apikey', //如设定机器人为 2 则此处须填写个人申请的天行apikey 申请地址https://www.tianapi.com/signup.html?source=474284281
}