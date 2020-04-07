const Author = require('../models/Author.js');
const Article = require('../models/Article.js');

exports.getAuthorHistory = async (req, res, next) => {
    let author = req.query.author;
    if(!author){
        return res.status(400).send();
    }
    try{
        let data = await Author.findOne({author});
        if(data){
            let history = await Article.findBy({author}) || [];
            res.send(history);
        }else{
            logger.debug("Not Found Author "+author);
            res.status(404).send();    
        }    
    }catch(err){
        logger.error('getAuthorHistory ' + err);
        res.status(500).send();
    }
};
