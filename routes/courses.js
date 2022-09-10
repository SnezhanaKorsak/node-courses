const { Router } = require('express')
const { validationResult } = require('express-validator')

const Course = require('../models/course')
const auth = require('../middleware/auth')
const { courseAddValidators } = require('../utils/validators')

const router = Router()

router.get('/', async (req, res) => {
  try {
    const courses = await Course.find().populate('userId', 'email name')

    res.render('courses', {
      title: 'Courses',
      isCourses: true,
      userId: req.user ? req.user._id.toString() : null,
      courses,
    })
  } catch (e) {
    console.log(e)
  }
})

router.get('/:id/edit', auth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)

    if (!req.query.allow) {
      return res.redirect('/')
    }

    res.render('course-edit', {
      title: 'Edit',
      course,
      editError: req.flash('editError'),
    })
  } catch (e) {
    console.log(e)
  }
})

router.post('/edit', courseAddValidators, auth, async (req, res) => {
  const { id, ...data } = req.body
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    req.flash('editError', errors.array()[0].msg)
    return res.status(422).redirect(`/courses/${id}/edit?allow=true`)
  }
  try {
    await Course.findByIdAndUpdate(id, data)
    res.redirect('/courses')
  } catch (e) {
    console.log(e)
  }
})

router.post('/remove', auth, async (req, res) => {
  try {
    await Course.deleteOne({ _id: req.body.id })
    res.redirect('/courses')
  } catch (e) {
    console.log(e)
  }

})

router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
    res.render('course', {
      layout: 'empty',
      title: course.title,
      course
    })
  } catch (e) {
    console.log(e)
  }
})

module.exports = router
