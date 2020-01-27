const express = require('express')
const { asyncHandler } = require('../utils')
const usersService = require('../services/UsersService')

const router = express.Router()

router.get('/', asyncHandler(async (req, res) => {
  const users = await usersService.getAllUsers()

  res.render('content.njk', { users })
}))

module.exports = router
