const {
  createMenu,
  getMenuList
} = require('../service/menu.service')
const {
  addMenuError,
} = require('../constant/user.type')
const {
  convertToTreeData
} = require('../../utils/tool')
class MenuController {
  async addMenu(ctx, next) {
    // 1、获取数据
    const menuData = ctx.request.body
    // 2、操作数据库
    try {
      const res = await createMenu(menuData)
      console.log(res);
    } catch (error) {
      console.log(error);
      ctx.app.emit('error', addMenuError(), ctx)
    }
    // 3、返回结果
  }
  async getAllMenus(ctx, next) {
    try {
      const res = await getMenuList()
      let list = []
      res.forEach(e => {
        list.push(e.dataValues)
      });
      const newList = await convertToTreeData(list, 1)
      // console.log(newList);
      console.log(ctx.state.user);
      ctx.body = newList
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new MenuController()