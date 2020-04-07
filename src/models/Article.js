'use strict'

const HttpRequest = require('../helpers/HttpRequest')

const Article = {}

Article.findBy = function ({ author }) {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await HttpRequest.fetchData({ query: `articles?author=${author}` })
      resolve(data.filter(Article.validate).map(Article.mapValues))
    } catch (e) {
      reject(e)
    }
  })
}

Article.mapValues = function (data) {
  const raw = {
    title: data.title || data.story_title,
    url: data.url,
    author: data.author,
    num_comments: data.num_comments,
    story_id: data.story_id,
    story_title: data.story_title,
    story_url: data.story_url
  }
  return raw
}
Article.validate = function (data) {
  if (!data.title && !data.story_title) {
    return false
  } else {
    return true
  }
}

module.exports = Article
