const keys = require('../keys')

module.exports = function (userEmail) {
  return {
    to: userEmail,
    from: keys.EMAIL_FROM,
    subject: 'The account was created successfully',
    html: `
    <h1>Welcome to our store</h1>
    <p>You have successfully registered</p>
    <hr>
    <a href=${keys.BASE_URL}>COURSES SHOP</a>
    `
  }
}
