const moment = require('moment')
const User = require('../models/user')

const City = require('../models/city')
const Citizenship = require('../models/country')
const Disability = require('../models/disability')
const MartialStatus = require('../models/martialStatus')

class UsersService {
  async getAllUsers () {
    const users = await User.find({})
      .sort('last_name')
      .populate('current_city')
      .populate('registered_city')
      .populate('martial_status')
      .populate('citizenship')
      .populate('disability')

    return users
  }

  async getRelatedData () {
    const cities = await City.find({}).sort('name')
    const citizenships = await Citizenship.find({}).sort('name')
    const disabilities = await Disability.find({}).sort({ name: -1 })
    const martialStatuses = await MartialStatus.find({}).sort({ name: -1 })

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

    const fullName = this._getFullName(data)
    const passportFull = this._getFullPassword(data)

    return User.create({
      ...data,
      full_name: fullName,
      passport_full: passportFull,
      birth_date: moment(data.birth_date, 'DD.MM.YYYY'),
      passport_issue_date: moment(data.passport_issue_date, 'DD.MM.YYYY'),
      retired: !!data.retired
    })
  }

  async updateUser (_id, data) {
    delete data._id
    delete data._method

    const fullName = this._getFullName(data)
    const passportFull = this._getFullPassword(data)

    return User.updateOne({ _id }, {
      ...data,
      full_name: fullName,
      passport_full: passportFull,
      birth_date: moment(data.birth_date, 'DD.MM.YYYY'),
      passport_issue_date: moment(data.passport_issue_date, 'DD.MM.YYYY'),
      retired: !!data.retired
    })
  }

  async deleteUserById (_id) {
    await User.deleteOne({ _id })
  }

  // eslint-disable-next-line camelcase
  _getFullName ({ first_name, last_name, middle_name }) {
    return `${last_name.trim()} ${first_name.trim()} ${middle_name.trim()}`
  }

  // eslint-disable-next-line camelcase
  _getFullPassword ({ passport_series, passport_number }) {
    return `${passport_series.trim()}${passport_number.trim()}`
  }
}

const service = new UsersService()

module.exports = service
