const { Router } = require('express')
const router = Router()
const AuthorController = require('../controllers/AuthorController')

// GET author History.
router.route("/author_history").get(AuthorController.getAuthorHistory)

module.exports = router
