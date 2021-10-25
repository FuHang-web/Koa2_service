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
}

module.exports = new MenuService()