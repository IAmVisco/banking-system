const Deposit = require('../models/deposit')

class DepositService {
  REVOCABLE_TYPE = 1
  IRREVOCABLE_TYPE = 2

  async getAllDeposits () {
    const deposits = await Deposit.find({})
      .populate('owner')
      .populate('currency')

    return deposits
  }

  async withdrawDeposit (_id) {
    const deposit = await Deposit.findOne({ _id })
    let withdrawAmount
    if (deposit.type === this.REVOCABLE_TYPE) {
      withdrawAmount = deposit.balance - deposit.sum
      deposit.balance = deposit.sum
      await deposit.save()

      return {
        message: `Withdrew [amount]!`,
        withdrawAmount,
        style: 'success'
      }
    } else if (deposit.type === this.IRREVOCABLE_TYPE) {
      withdrawAmount = deposit.balance

      await Deposit.deleteOne({ _id })

      return {
        message: `Withdrew [amount] and closed the deposit!`,
        withdrawAmount,
        style: 'success'
      }
    } else {
      return {
        message: 'Incorrect deposit type!',
        type: 'danger'
      }
    }
  }

  async createDeposit (data) {
    return Deposit.create({
      ...data,
      balance: data.sum
    })
  }
}

const service = new DepositService()

module.exports = service
