const {
    getOssConfigure
} = require('../service/configure')

class ConfigureController {
    async ossConfigure(ctx, next) {
        try {
            const {dataValues: res} = await getOssConfigure()
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new ConfigureController()