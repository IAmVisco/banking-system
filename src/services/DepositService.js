const Deposit = require('../models/deposit')

class DepositService {
  async getAllDeposits () {
    const deposits = await Deposit.find({})
      .populate('owner')
      .populate('currency')

    return deposits
  }

  async getDepositById (_id) {
    const deposit = await Deposit.findOne({ _id })

    return deposit
  }

  async createDeposit (data) {
    delete data._method

    return Deposit.create({
      ...data
    })
  }

  async deleteDepositById (_id) {
    await Deposit.deleteOne({ _id })
  }
}

const service = new DepositService()

module.exports = service
