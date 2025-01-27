const fs = require("fs");
const Feature = require("../models/featureModel");

exports.add = async (req, res) => {
  const image = req?.file?.filename;
  const { title, description } = req.body;

  try {
    const newFeature = await Feature.create({
      title,
      description,
      image: `features/${image}`,
    });

    res.status(201).json({
      success: true,
      message: "Feature  created successfully",
      data: newFeature,
    });
  } catch (error) {
    if (image) {
      fs.unlink(`./uploads/features/${image}`, (err) => {
        if (err) console.error("Failed to delete image:", err);
      });
    }

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    const features = await Feature.find();

    if (!features || features.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No feature s found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Feature s fetched successfully",
      data: features,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getSingle = async (req, res) => {
  const { id } = req.params;

  try {
    const feature = await Feature.findById(id);

    if (!feature) {
      return res.status(404).json({
        success: false,
        message: "Feature  not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Feature  fetched successfully",
      data: feature,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const image = req?.file?.filename;

  try {
    const existingFeature = await Feature.findById(id);

    if (!existingFeature) {
      if (image) {
        fs.unlink(`./uploads/features/${image}`, (err) => {
          if (err) console.error("Failed to delete uploaded image:", err);
        });
      }
      return res.status(404).json({
        success: false,
        message: "Feature  not found",
      });
    }

    if (image && existingFeature.image) {
      fs.unlink(`./uploads/features/${existingFeature.image}`, (err) => {
        if (err) console.error("Failed to delete old image:", err);
      });
    }

    const updatedData = {
      title: title || existingFeature.title,
      description: description || existingFeature.description,
      image: image ? `features/${image}` : existingFeature.image,
    };

    const updatedFeature = await Feature.findByIdAndUpdate(id, updatedData, { new: true });

    res.status(200).json({
      success: true,
      message: "Feature  updated successfully",
      data: updatedFeature,
    });
  } catch (error) {
    if (image) {
      fs.unlink(`./uploads/features/${image}`, (err) => {
        if (err) console.error("Failed to delete uploaded image:", err);
      });
    }

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.destroy = async (req, res) => {
  const { id } = req.params;

  try {
    const feature = await Feature.findById(id);

    if (!feature) {
      return res.status(404).json({
        success: false,
        message: "Feature  not found",
      });
    }

    if (feature.image) {
      fs.unlink(`./uploads/features/${feature.image}`, (err) => {
        if (err) console.error("Failed to delete image:", err);
      });
    }

    await Feature.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Feature  deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};