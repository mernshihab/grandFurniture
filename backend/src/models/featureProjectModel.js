const mongoose = require("mongoose");

const featureProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const FeatureProject = mongoose.model("FeatureProject", featureProjectSchema);

module.exports = FeatureProject;