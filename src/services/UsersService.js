const User = require('../models/user')

class UsersService {
  async getAllUsers() {
    const users = await User.find({})

    return users
  }

  async createUser(data) {
    console.log(data)
    // const user = await User.create({
    //   first_name,
    //   last_name,
    //   middle_name,
    //   birth_date,
    //   passport_series,
    //   passport_number,
    //   passport_issuer,
    //   passport_issue_date,
    //   id_number,
    //   birth_place,
    //   current_city,
    //   current_address,
    //   registered_city,
    //   martial_status,
    //   citizenship,
    //   disability,
    //   retired
    // })
  }
}

const service = new UsersService()

module.exports = service
