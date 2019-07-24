const mongoose = require('mongoose');

const LogsSchema = mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  attention: {
    type: Boolean,
    required: true
  },
  tech: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'techs'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('logs', LogsSchema);
