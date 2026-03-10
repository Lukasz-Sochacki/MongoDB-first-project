const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true, minLength: 5, maxLength: 20 },
});

module.exports = mongoose.model('Department', departmentSchema);
