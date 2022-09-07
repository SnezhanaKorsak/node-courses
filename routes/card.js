const { Router } = require('express')

const Cart = require('../models/card')
const Course = require('../models/course')

const router = Router()

router.post('/add', async (req, res) => {
  const course = await Course.getCourseById(req.body.id)

  await Cart.add(course)
  res.redirect('/card')
})

router.get('/', async  (req, res) => {
  const cart = await Cart.fetch()

  res.render('card', {
    title: "Cart",
    isCart: true,
    coursesInCart: cart.courses,
    price: cart.price
  })
})


router.delete('/remove/:id', async  (req, res) => {
 const cart = await Cart.remove(req.params.id)

  res.status(200).json(cart)
})

module.exports = router
