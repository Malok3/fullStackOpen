const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')


// usersRouter.get('/', async (request, response) => {
//   const users = await User.find({})
//   response.json(users)
// })
usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { content: 1, important: 1 })

  response.json(users)
})


usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (!password) {
    return response.status(400).json({ error: 'Password required' })
  }
  if (password.length < 3) {
    return response.status(400).json({ error: 'User validation failed: password: Password should be a least 3 characters' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)


  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)

})

module.exports = usersRouter