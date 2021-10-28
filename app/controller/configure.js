const {
    getOssConfigure
} = require('../service/configure')

class ConfigureController {
    async ossConfigure(ctx, next) {
        console.log('0');
        try {
            const {
                dataValues: res
            } = await getOssConfigure()
            // console.log(res);
            return {
                region: res.region,
                // 阿里云账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM用户进行API访问或日常运维，请登录RAM控制台创建RAM用户。
                accessKeyId: res.access_key_id,
                accessKeySecret: res.access_key_secret,
                // 填写Bucket名称。
                bucket: res.bucket
            }
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new ConfigureController()