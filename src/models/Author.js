'use strict'
const HttpRequest = require('../helpers/HttpRequest')

const Author = {};

Author.findBy = function ({ author }) {
  return HttpRequest.fetchData({ query: `article_users?username=${author}` })
}
Author.findOne = function ({ author }) {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await HttpRequest.fetchData({ query: `article_users?username=${author}` })
      if (data.length) {
        resolve(data[0])
      } else {
        resolve(null)
      }
    } catch (e) {
      reject(e)
    }
  })
}

module.exports = Author
