const { Router } = require('express')

const Course = require('../models/course')
const auth = require('../middleware/auth')

const router = Router()

function mapCartItems(cart) {
  return cart.items.map(item => ({
    ...item.courseId._doc,
    id: item.courseId.id,
    count: item.count
  }))
}

function getTotalPrice(courses) {
  return courses.reduce((price, course) => course.price * course.count + price, 0)
}

router.post('/add', auth, async (req, res) => {
  const course = await Course.findById(req.body.id)

  await req.user.addToCart(course)
  res.redirect('/card')
})

router.get('/', auth, async  (req, res) => {
  const user = await req.user.populate('cart.items.courseId')

  const courses = mapCartItems(user.cart)

  res.render('card', {
    title: "Cart",
    isCart: true,
    coursesInCart: courses,
    price: getTotalPrice(courses)
  })
})

router.delete('/remove/:id', auth, async  (req, res) => {
  await req.user.removeFromCart(req.params.id)
  const user = await req.user.populate('cart.items.courseId')

  const courses = mapCartItems(user.cart)
  const cart = {
    courses, price: getTotalPrice(courses)
  }

  res.status(200).json(cart)
})

module.exports = router
