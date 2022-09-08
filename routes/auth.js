const { Router } = require('express')
const User = require('../models/user')

const router = Router()

router.get('/login', async (req, res) => {
  try {
    res.render('auth/login', {
      title: "Authorization",
      isLogin: true
    })
  } catch (e) {
    console.log(e)
  }
})

router.get('/logout', async (req, res) => {
  req.session.destroy(() => {
    res.redirect('/auth/login#login')
  })
})

router.post('/login', async (req, res) => {
  const user = await User.findById('6319b73ed6731d278eae4bd7')

  req.session.user = user
  req.session.isAuthenticated = true
  req.session.save(err => {
    if(err) throw err

    res.redirect('/')
  })
})

module.exports = router
