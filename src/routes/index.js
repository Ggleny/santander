const {Router} = require("express");
const router = Router();
const AuthorController = require("../controllers/AuthorController");


// Home page route.
router.get('/', function (req, res) {
    res.send('Wiki home page');
})

// About page route.
router.get('/author_history',  AuthorController.getAuthorHistory);
                
module.exports = router;


