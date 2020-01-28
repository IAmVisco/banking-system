const moment = require('moment')
const express = require('express')
const { asyncHandler } = require('../utils')
const usersService = require('../services/UsersService')

// const City = require('../models/city')
// const Citizenship = require('../models/citizenship')
// const Disability = require('../models/disability')
// const MartialStatus = require('../models/martialStatus')
// const User = require('../models/user')

const router = express.Router()

router.get('/', asyncHandler(async (req, res) => {
  const users = await usersService.getAllUsers()

  res.render('users.njk', { users, moment })
}))

router.get('/create', asyncHandler(async (req, res) => {
  res.render('usersEditForm.njk')
}))

router.get('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params

  const user = await usersService.getUserById(id)

  res.render('usersEditForm.njk', { user, moment })
}))

router.post('/', asyncHandler(async (req, res) => {
  const { _method } = req.body

  if (_method === 'post') {
    await usersService.createUser(req.body)
  } else if (_method === 'put') {
    // await usersService.updateUser(req.body)
  } else {
    throw Error('Wrong update method')
  }

  const users = await usersService.getAllUsers()

  res.render('users.njk', { users, moment })
}))

module.exports = router
