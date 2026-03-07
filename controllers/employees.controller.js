const Employee = require('../models/employee.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Employee.find().populate('department'));
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Employee.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const dep = await Employee.findOne().skip(rand).populate('department');
    if (!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const dep = await Employee.findById(req.params.id).populate('department');
    if (!dep) res.status(404).json({ message: 'Not found...' });
    else res.json(dep);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.post = async (req, res) => {
  try {
    const { firstName, lastName } = req.body;

    const newEmployee = new Employee({
      firstName: firstName,
      lastName: lastName,
    });
    await newEmployee.save();
    res.json({ message: 'OK - post' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.put = async (req, res) => {
  const { firstName, lastName } = req.body;

  try {
    const emp = await Employee.findById(req.params.id);
    if (emp) {
      await Employee.updateOne(
        { _id: req.params.id },
        { $set: { firstName: firstName, lastName: lastName } },
      );
      res.json({ message: 'OK - put' });
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.delete = async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id);
    if (dep) {
      await Employee.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK - delete' });
    } else res.status(404).json({ message: 'Not found' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
