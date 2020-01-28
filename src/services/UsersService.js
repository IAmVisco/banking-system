const moment = require('moment')
const User = require('../models/user')

const City = require('../models/city')
const Citizenship = require('../models/citizenship')
const Disability = require('../models/disability')
const MartialStatus = require('../models/martialStatus')

class UsersService {
  async getAllUsers () {
    const users = await User.find({})

    return users
  }

  async getRelatedData () {
    const cities = await City.find({})
    const citizenships = await Citizenship.find({})
    const disabilities = await Disability.find({})
    const martialStatuses = await MartialStatus.find({})

    return {
      cities,
      citizenships,
      disabilities,
      martialStatuses
    }
  }

  async getUserById (_id) {
    const user = await User.findOne({ _id })

    return user
  }

  async createUser (data) {
    delete data._method

    return User.create({
      ...data,
      full_name: `${data.first_name.trim()}${data.last_name.trim()}`,
      birth_date: moment(data.birth_date, 'DD.MM.YYYY'),
      passport_issue_date: moment(data.passport_issue_date, 'DD.MM.YYYY'),
      retired: !!data.retired
    })
  }

  async updateUser (_id, data) {
    delete data._id
    delete data._method

    return User.updateOne({ _id }, {
      ...data,
      full_name: `${data.first_name.trim()}${data.last_name.trim()}`,
      birth_date: moment(data.birth_date, 'DD.MM.YYYY'),
      passport_issue_date: moment(data.passport_issue_date, 'DD.MM.YYYY'),
      retired: !!data.retired
    })
  }

  async deleteUserById (_id) {
    await User.deleteOne({ _id })
  }
}

const service = new UsersService()

module.exports = service
