const express = require('express')
const { asyncHandler } = require('../utils')
const usersService = require('../services/UsersService')
const depositService = require('../services/DepositService')

const Currency = require('../models/currency')

const router = express.Router()

router.get('/', asyncHandler(async (req, res) => {
  const deposits = await depositService.getAllDeposits()

  res.render('deposits/deposits.njk', { deposits, title: 'Deposits list' })
}))

router.get('/create', asyncHandler(async (req, res) => {
  const users = await usersService.getAllUsers()
  const currencies = await Currency.find({})

  res.render('deposits/depositsEditForm.njk', {
    currencies,
    users,
    title: 'Deposit create'
  })
}))

router.post('/withdraw', asyncHandler(async (req, res) => {
  const { _id } = req.body

  const alertData = await depositService.withdrawDeposit(_id)

  const deposits = await depositService.getAllDeposits()

  res.render('deposits/deposits.njk', {
    alert: alertData,
    deposits,
    title: 'Deposits list'
  })
}))

router.post('/', asyncHandler(async (req, res) => {
  await depositService.createDeposit(req.body)

  res.redirect('/deposits')
}))

module.exports = router
