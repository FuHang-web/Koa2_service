const Menu = require('../models/menu.models')

class MenuService {
  async createMenu(menu) {
    const res = await Menu.create({
      // 表的字段：
      name: menu.name,
      permission: menu.permission,
      parent_id: menu.parent_id,
      path: menu.path,
      component: menu.component,
      icon: menu.icon,
      sort: menu.sort,
      type: menu.type,
      keep_alive: menu.keep_alive,
    })
    return res
  }

  async getMenuList() {
    const res = await Menu.findAll()
    // console.log(res.length);
    return res
  }

  async getMenuPage(params) {
    const page = Number(params.current) || 1,
      page_size = Number(params.size) || 10
    const res = await Menu.findAndCountAll({
      // include: [{
      //   model: this.ctx.model.User.scope([{
      //       method: ['hasName', name]
      //     },
      //     {
      //       method: ['hasEnterprise', enterprise]
      //     },
      //   ]),
      //   required: true,
      // }],
      order: [
        ['created_at', 'DESC']
      ], //倒序
      //分页
      limit: page_size,
      offset: page_size * (page - 1),
    });
    return res
  }
}

module.exports = new MenuService()