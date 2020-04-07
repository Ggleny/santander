'use strict';

const Joi = require('@hapi/joi');
const HttpRequest = require('../helpers/HttpRequest');

const Article = {};/*Joi.object({
title: Joi.string(),
url: Joi.string(),
author: Joi.string(),
num_comments: Joi. integer(),
story_id: Joi. integer(),
story_title: Joi.string(),
story_url: Joi.string(),
parent_id: Joi. integer(),
created_at: Joi. integer()
});*/

Article.findBy =  function({author}) {
    return new Promise(async (resolve,reject)=>{
        try{
            const data = await HttpRequest.fetchData({query:`articles?author=${author}`});
            resolve(data.filter(Article.validate).map(Article.mapValues));
        }catch(e){
            reject(e)
        }
    })
}

Article.mapValues = function(data) {
    let raw = {
        title: data.title || data.story_title,
        url: data.url,
        author: data.author,
        num_comments: data.num_comments,
        story_id: data.story_id,
        story_title: data.story_title,
        story_url: data.story_url
    }

    return data;
}
Article.validate = function(data) {
    if (!data.title && !data.story_title) { 
        return false 
    }else{
        return true
    } 
}

  module.exports = Article;