const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  if (!username || !password){
    return response.status(400).json({ error: 'Username or Password is missing' })
  }else {
    if (username.length < 3||password.length < 3) {
      return response.status(400).json({ error: 'Both username and password must be at least 3 characters long' })
    }
    else{
      const user = new User({
        username,
        name,
        passwordHash,
      })

      const savedUser = await user.save()

      response.status(201).json(savedUser)
    }
  }


  console.log ('name', name)
  console.log ('usernam', username)
  console.log ('password', password)


})

module.exports = usersRouter