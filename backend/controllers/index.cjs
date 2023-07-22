const Entity = require('../models/index.cjs');

module.exports.getEntity = (req, res) => {
    Entity.find({})
        .then((cards) => res.send(cards))
        .catch((err) => res.status(500).send(err.message));
};
module.exports.removeEntity = (req, res) => {
    Entity.findByIdAndRemove(req.params.entityId)
        .then(() => res.send('Entity remove'))
        .catch((err) => res.status(500).send(err.message));
};
module.exports.addEntity = (req, res) => {
    const { name, coordinate, labels, createdAt } = req.body;
    Entity.create({ name, coordinate, labels, createdAt })
        .then((entity) => res.status(201).send(entity))
        .catch((err) => res.status(500).send(err.message));
};
module.exports.updateEntity = (req, res) => {
    const { name, coordinate, labels } = req.body;
    Entity.findByIdAndUpdate(req.params.entityId,
        { name, coordinate, labels },
        { new: true })
        .then((card) => res.send(card))
        .catch((err) => res.status(500).send(err.message));
};
