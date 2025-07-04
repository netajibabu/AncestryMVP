const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  middleName: { type: String },
  surName: { type: String, required: true },
  fatherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Person' },
  motherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Person' },
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  dateOfBirth: { type: Date, required: true },
  dateOfDeath: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Person', personSchema); 