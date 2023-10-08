const router = require('express').Router();
const { hasUser } = require('../middlewares/guards');
const { all, getTotalCount, getById, like, getLastThree } = require('../services/articles');
const { pagination } = require('../utils/constants/global');
const { mapErrors } = require('../utils/parser');

router.get('/', async (req, res) => {
    try {
        const articles = await getLastThree();
        res.json(articles);
    } catch (error) {
        const message = mapErrors(error);
        res.status(400).json({ message });
    }
});

router.get('/:page/:category/:query?', async (req, res) => {
    try {
        const currentPage = req.params.page;
        const selectedCategory = req.params.category !== 'default' ? req.params.category : '';
        const searchedQuery = req.params.query || '';

        const skip = (currentPage - 1) * pagination.ARTICLES_PER_PAGE;
        const totalArticles = await getTotalCount(selectedCategory, searchedQuery);
        const pagesCount = Math.ceil(totalArticles / pagination.ARTICLES_PER_PAGE);

        const articles = await all(pagination.ARTICLES_PER_PAGE, skip, selectedCategory, searchedQuery);
        res.json({ articles, pagesCount, currentPage });
    } catch (error) {
        const message = mapErrors(error);
        res.status(400).json({ message });
    }
});

router.get('/:id', hasUser(), async (req, res) => {
    try {
        const id = req.params.id;
        const article = await getById(id, true);
        res.json(article);
    } catch (error) {
        const message = mapErrors(error);
        res.status(400).json({ message });
    }
});

router.post('/:id', hasUser(), async (req, res) => {
    try {
        const id = req.params.id;
        const userId = req.user._id;

        const article = await like(id, userId);
        res.json(article);
    } catch (error) {
        const message = mapErrors(error);
        res.status(400).json({ message });
    }
});

module.exports = router;