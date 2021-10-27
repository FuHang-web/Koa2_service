const {
    OSS
} = require('../models/configure')

class ConfigureService {
    async getOssConfigure() {
        // console.log(OSS);
        const res = await OSS.findOne()
        console.log(res);
        return res
    }
}

module.exports = new ConfigureService()