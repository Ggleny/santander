'use strict';
const HttpRequest = require('../helpers/HttpRequest');

const Author = {}; /*Joi.object({
  id: 1,
  about: Joi.string(),
  username: Joi.string(),
  submitted: Joi.string(),
  submission_count: Joi. integer(),
  comment_count: Joi. integer(),
  created_at: Joi. integer(),
  updated_at: Joi. integer()
});*/

Author.findBy = function({author}) {
  return HttpRequest.fetchData({query:`article_users?username=${author}`});
}
Author.findOne = function({author}) {
  return new Promise(async (resolve,reject)=>{
    try {
      let data = await HttpRequest.fetchData({query:`article_users?username=${author}`});
      if(data.length){
        resolve(data[0]);
      } else {
        resolve(null)
      }
    }catch(e){
      reject(e);
    }
  })
}

module.exports = Author;