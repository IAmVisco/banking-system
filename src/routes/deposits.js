// const moment = require('moment')
const express = require('express')
const { asyncHandler } = require('../utils')
// const usersService = require('../services/UsersService')
const depositService = require('../services/DepositService')

const router = express.Router()

router.get('/', asyncHandler(async (req, res) => {
  const deposits = await depositService.getAllDeposits()

  res.render('deposits/deposits.njk', { deposits, title: 'Deposits list' })
}))

// router.get('/create', asyncHandler(async (req, res) => {
//   const relatedData = await usersService.getRelatedData()
//
//   res.render('usersEditForm.njk', {
//     ...relatedData,
//     title: 'User create'
//   })
// }))
//
// router.get('/:id', asyncHandler(async (req, res) => {
//   const { id } = req.params
//
//   const user = await usersService.getUserById(id)
//   const relatedData = await usersService.getRelatedData()
//
//   res.render('usersEditForm.njk', {
//     ...relatedData,
//     title: 'User edit',
//     moment,
//     user
//   })
// }))
//
router.post('/', asyncHandler(async (req, res) => {
  const { _method } = req.body

  if (_method === 'post') {
    await depositService.createDeposit(req.body)
  }
  // else if (_method === 'put') {
  //   await depositService.updateUser(req.body._id, req.body)
  // }

  res.redirect('/deposits')
}))

router.post('/delete', asyncHandler(async (req, res) => {
  await depositService.deleteDepositById(req.body._id)

  res.redirect('/deposits')
}))

module.exports = router
