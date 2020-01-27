const Quote = require('../models/user')

class UsersService {
  async getAllUsers() {
    const users = await Quote.find({})

    return users
  }

  async createUser(data) {

  }
}

const service = new UsersService()

module.exports = service
