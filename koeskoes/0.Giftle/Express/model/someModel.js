const mongoose = require('mongoose');

const someModel = new mongoose.Schema({
  modelId: {
    type: String,
    required: true
  },
  modelName: {
    type: String,
    required: true
  },
  modelExtra: {
    type: Number,
    required: true
  }
});

const model = mongoose.model('Model', someModel);