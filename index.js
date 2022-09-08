const Handlebars = require('handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')

const express = require('express')
const path = require('path')

const homeRoutes = require('./routes/home')
const coursesRoutes = require('./routes/courses')
const addRoutes = require('./routes/add')
const cardRoutes = require('./routes/card')
const ordersRoutes = require('./routes/orders')
const User = require('./models/user')

const app = express()

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
  handlebars: allowInsecurePrototypeAccess(Handlebars)
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(async (req, res, next) => {
  try {
    const user = await User.findById('6319b73ed6731d278eae4bd7')
    req.user = user
    next()
  } catch (e) {
    console.log(e)
  }

})

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))

app.use('/', homeRoutes)
app.use('/courses',coursesRoutes)
app.use('/add',addRoutes)
app.use('/card',cardRoutes)
app.use('/orders',ordersRoutes)


const PORT = process.env.PORT || 3000

async function start() {
  try {
    const url = `mongodb+srv://Snega:2809fifka1103astra@cluster0.vynq4ec.mongodb.net/shop`
    await mongoose.connect(url, { useNewUrlParser: true })

    const candidate = await User.findOne()

    if(!candidate) {
      const user = new User({
        email: 'snezhinka2809@mail.ru',
        name: 'Snega',
        cart: { items: [] }
      })
      await user.save()
    }

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}

start()

