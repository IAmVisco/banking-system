const moment = require('moment');
const User = require('../models/user')

class UsersService {
  async getAllUsers() {
    const users = await User.find({})

    return users
  }

  async createUser(data) {
    console.log(data)

    return User.create({
      ...data,
      birth_date: moment(data.birth_date),
      retired: !!data.retired
    })
  }
}

const service = new UsersService()

module.exports = service
