const fs = require('fs')
const path = require('path')
const {v4} = require('uuid')

class Course {
  constructor(title, price, img) {
    this.id = v4()
    this.title = title
    this.price = price
    this.img = img
  }

  generateCourse() {
    return {
      id: this.id,
      title: this.title,
      price: this.price,
      img: this.img
    }
  }

  async save() {
    const courses = await Course.getAll()
    courses.push(this.generateCourse())

    return new Promise(((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, '..', 'data', 'data.json'),
        JSON.stringify(courses),
        (err) => {
          if(err) reject(err)

          resolve()
        }
      )
    }))
  }

  static async update(course) {
    const courses = await Course.getAll()

    const index = courses.findIndex(item => item.id === course.id)
    courses[index] = course

    return new Promise(((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, '..', 'data', 'data.json'),
        JSON.stringify(courses),
        (err) => {
          if(err) reject(err)

          resolve()
        }
      )
    }))
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname,'..', 'data', 'data.json'),
        'utf-8',
        (err, data) => {
          if(err) reject(err)

          resolve(JSON.parse(data))
        }
      )
    })
  }

  static async getCourseById(id) {
    const courses = await Course.getAll()

    return courses.find(item => item.id === id)
  }
}

module.exports = Course
