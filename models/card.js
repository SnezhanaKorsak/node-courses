const fs = require('fs')
const path = require('path')

const filePath = path.join(
  path.dirname(require.main.filename),
  'data',
  'cart.json'
)

class Cart {
  static async add(course) {
    const cart = await Cart.fetch()

    const index = cart.courses.findIndex(item => item.id === course.id)
    const candidate = cart.courses[index]

    if (candidate) {
      // course is already in the cart
      candidate.count++
      cart.courses[index] = candidate
    } else {
      // need to add course to the cart
      course.count = 1
      cart.courses.push(course)
    }

    cart.price += +course.price

    return new Promise(((resolve, reject) => {
      fs.writeFile(
        filePath,
        JSON.stringify(cart),
        (err) => {
          if (err) reject(err)

          resolve()
        }
      )
    }))
  }

  static async fetch() {
    return new Promise((resolve, reject) => {
      fs.readFile(
        filePath,
        'utf-8',
        (err, data) => {
          if (err) reject(err)

          resolve(JSON.parse(data))
        }
      )
    })
  }

  static async remove(id) {
    const cart = await Cart.fetch()

    const index = cart.courses.findIndex(item => item.id === id)
    const course = cart.courses[index]

    if(course.count === 1) {
      cart.courses = cart.courses.filter(item => item.id !== id)
    } else {
      course.count--
    }

    cart.price -= +course.price

    return new Promise(((resolve, reject) => {
      fs.writeFile(
        filePath,
        JSON.stringify(cart),
        (err) => {
          if (err) reject(err)

          resolve(cart)
        }
      )
    }))
  }
}

module.exports = Cart
