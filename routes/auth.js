const { Router } = require('express')
const bcrypt = require('bcryptjs')

const User = require('../models/user')

const router = Router()

router.get('/login', async (req, res) => {
  try {
    res.render('auth/login', {
      title: "Authorization",
      isLogin: true,
      loginError: req.flash('loginError'),
      registerError: req.flash('registerError'),
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
  try {
    const { email, password } = req.body
    const candidate = await User.findOne({ email })

    if (candidate) {
      const isSame = await bcrypt.compare(password, candidate.password)

      if (isSame) {
        req.session.user = candidate
        req.session.isAuthenticated = true
        req.session.save(err => {
          if (err) throw err
          res.redirect('/')
        })
      } else {
        req.flash('loginError', 'Check your password')
        res.redirect('/auth/login#login')
      }
    } else {
      req.flash('loginError', 'There is no such user')
      res.redirect('/auth/login#login')
    }
  } catch (e) {
    console.log(e)
  }
})

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, confirm } = req.body
    const candidate = await User.findOne({ email })

    if (candidate) {
      req.flash('registerError', 'A user with this email already exists')
      res.redirect('/auth/login#register')
    } else {
      const hashPassword = await bcrypt.hash(password, 10)
      const user = new User({ name, email, password: hashPassword , cart: { items: [] } })

      await user.save()
      res.redirect('/auth/login#login')
    }
  } catch (e) {
    console.log(e)
  }
})

module.exports = router
