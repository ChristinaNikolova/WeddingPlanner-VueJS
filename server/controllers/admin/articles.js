const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const { isAdmin } = require('../../middlewares/guards');
const { create, deleteById, update } = require('../../services/articles');
const { mapErrors } = require('../../utils/parser');
const { category, errors: globalError } = require('../../utils/constants/global');

router.post('/', isAdmin(),
    body('image').isURL().withMessage(globalError.INVALID_URL),
    body('jumboImage').isURL().withMessage(globalError.INVALID_URL),
    async (req, res) => {
        try {
            const { errors } = validationResult(req);

            if (errors.length > 0) {
                throw mapErrors(errors);
            }

            if (req.body.category === category.DEFAULT_CATEGORY_SELECTED_ID) {
                throw new Error(globalError.SELECT_CATEGORY);
            }

            const article = await create(req.body.title, req.body.content, req.body.image, req.body.jumboImage, req.body.category);
            res.json(article);
        } catch (error) {
            const message = mapErrors(error);
            res.status(400).json({ message });
        }
    });

router.put('/:id', isAdmin(),
    body('image').isURL().withMessage(globalError.INVALID_URL),
    body('jumboImage').isURL().withMessage(globalError.INVALID_URL),
    async (req, res) => {
        try {
            const { errors } = validationResult(req);

            if (errors.length > 0) {
                throw mapErrors(errors);
            }

            const id = req.params.id;
            const article = await update(id, req.body.title, req.body.content, req.body.image, req.body.jumboImage, req.body.category);
            res.json(article);
        } catch (error) {
            const message = mapErrors(error);
            res.status(400).json({ message });
        }
    });

router.delete('/:id', isAdmin(), async (req, res) => {
    try {
        const id = req.params.id;
        const article = await deleteById(id);
        res.json(article);
    } catch (error) {
        const message = mapErrors(error);
        res.status(400).json({ message });
    }
});

module.exports = router;