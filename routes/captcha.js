const Router = require('koa-router')
const svgCaptcha = require('svg-captcha')
const router = new Router({
    prefix: '/captcha'
})

router.get('/getCode', async (ctx, next) => {
    const captcha = svgCaptcha.create({
        size: 4, //验证码长度
        fontSize: 45, //验证码字号
        noise: 1, //干扰线条数目
        width: 120, //宽度
        height: 36, //高度
        color: true, //验证码字符是否有颜色，默认是没有，但是如果设置了背景颜色，那么默认就是有字符颜色
        background: '#ccc' // 背景
    })
    ctx.session.code = captcha.text
    ctx.response.type = 'image/svg+xml'
    ctx.body = captcha.data
    console.log(ctx.session.code);
})

module.exports = router