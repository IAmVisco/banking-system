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

  res.render('users.njk', { users })
}))

router.post('/', asyncHandler(async (req, res) => {
  await usersService.createUser(req)

  const users = await usersService.getAllUsers()

  res.render('users.njk', { users })
}))

module.exports = router
