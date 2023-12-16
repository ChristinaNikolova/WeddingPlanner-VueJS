const { getFavArticles, getUserTotalCount } = require('../services/users');
const { mapErrors } = require('../utils/parser');
const { hasUser } = require('../middlewares/guards');
const { pagination } = require('../utils/constants/global');

const router = require('express').Router();

router.get('/articles/:page', hasUser(), async (req, res) => {
    try {
        const userId = req.user._id;
        const totalArticles = await getUserTotalCount(userId);
        
        const currentPage = req.params.page;
        const skip = (currentPage - 1) * pagination.ARTICLES_PER_PAGE;
        const pagesCount = Math.ceil(totalArticles / pagination.ARTICLES_PER_PAGE);

        const articles = await getFavArticles(userId, pagination.ARTICLES_PER_PAGE, skip);
        res.json({ articles, pagesCount, currentPage });
    } catch (error) {
        const message = mapErrors(error);
        res.status(400).json({ message });
    }
});

module.exports = router;