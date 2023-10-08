const router = require('express').Router();
const { hasUser } = require('../middlewares/guards');
const { all, create, heightlight, deleteById, update, getById } = require('../services/events');
const { mapErrors } = require('../utils/parser');

router.get('/:id', hasUser(), async (req, res) => {
    try {
        const plannerId = req.params.id;
        const events = await all(plannerId);
        res.json(events);
    } catch (error) {
        const message = mapErrors(error);
        res.status(400).json({ message });
    }
});

router.post('/:id', hasUser(), async (req, res) => {
    try {
        const plannerId = req.params.id;
        const event = await create(plannerId, req.body.title, req.body.startTime, req.body.endTime, req.body.duration);
        res.json(event);
    } catch (error) {
        const message = mapErrors(error);
        res.status(400).json({ message });
    }
});

router.post('/:plannerId/:eventId', hasUser(), async (req, res) => {
    try {
        const id = req.params.eventId;
        const event = await heightlight(id);
        res.json(event);
    } catch (error) {
        const message = mapErrors(error);
        res.status(400).json({ message });
    }
});

router.delete('/:id', hasUser(), async (req, res) => {
    try {
        const id = req.params.id;
        const event = await deleteById(id);
        res.json(event);
    } catch (error) {
        const message = mapErrors(error);
        res.status(400).json({ message });
    }
});

router.put('/:id', hasUser(), async (req, res) => {
    try {
        const id = req.params.id;
        const event = await update(id, req.body.title, req.body.startTime, req.body.endTime, req.body.duration);
        res.json(event);
    } catch (error) {
        const message = mapErrors(error);
        res.status(400).json({ message });
    }
});

router.get('/:plannerId/:eventId', hasUser(), async (req, res) => {
    try {
        const id = req.params.eventId;
        const event = await getById(id, true);
        res.json(event);
    } catch (error) {
        const message = mapErrors(error);
        res.status(400).json({ message });
    }
});

module.exports = router;