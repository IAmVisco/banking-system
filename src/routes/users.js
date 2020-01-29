const moment = require('moment')
const express = require('express')
const { asyncHandler } = require('../utils')
const usersService = require('../services/UsersService')

const router = express.Router()

router.get('/', asyncHandler(async (req, res) => {
  const users = await usersService.getAllUsers()

  res.render('users.njk', { users, moment, title: 'Users list' })
}))

router.get('/create', asyncHandler(async (req, res) => {
  const relatedData = await usersService.getRelatedData()

  res.render('usersEditForm.njk', {
    ...relatedData,
    title: 'User create'
  })
}))

router.get('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params

  const user = await usersService.getUserById(id)
  const relatedData = await usersService.getRelatedData()

  res.render('usersEditForm.njk', {
    ...relatedData,
    title: 'User edit',
    moment,
    user
  })
}))

router.post('/', asyncHandler(async (req, res) => {
  const { _method } = req.body

  if (_method === 'post') {
    await usersService.createUser(req.body)
  } else if (_method === 'put') {
    await usersService.updateUser(req.body._id, req.body)
  }

  res.redirect('/users')
}))

router.post('/delete', asyncHandler(async (req, res) => {
  await usersService.deleteUserById(req.body._id)

  res.redirect('/users')
}))

module.exports = router
