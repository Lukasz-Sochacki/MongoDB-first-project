const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;

router.get('/employees', (req, res) => {
  req.db
    .collection('employees')
    .find()
    .toArray()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

router.get('/employees/random', (req, res) => {
  req.db
    .collection('employees')
    .aggregate([{ $sample: { size: 1 } }])
    .toArray()
    .then((data) => {
      res.json(data[0]);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

router.get('/employees/:id', (req, res) => {
  req.db.collection('employees');
  findone({ _id: ObjectId(req.params.id) })
    .then((data) => {
      if (!data) res.status(404).json({ message: 'Not found...' });
      else res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

router.post('/employees', (req, res) => {
  const { firstName, lastName } = req.body;

  req.db
    .collection('employees')
    .insertOne({ firstName: firstName, lastName: lastName })
    .then(() => {
      res.json({ message: 'OK - post' });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

router.put('/employees/:id', (req, res) => {
  const { firstName, lastName } = req.body;

  req.db
    .collection('employees')
    .updateOne(
      { _id: ObjectId(req.params.id) },
      { $set: { firstName: firstName, lastName: lastName } },
    )
    .then(() => {
      res.json({ message: 'OK - put' });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

router.delete('/employees/:id', (req, res) => {
  req.db
    .collection('employees')
    .deleteOne({ _id: ObjectId(req.params.id) })
    .then(() => {
      res.json({ message: 'OK - delete' });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

module.exports = router;
