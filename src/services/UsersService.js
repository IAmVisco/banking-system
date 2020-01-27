const Quote = require('../models/user')

class UsersService {
  async getAllUsers() {
    const users = await Quote.find({})

    return users
  }
}

const service = new UsersService()

module.exports = service
