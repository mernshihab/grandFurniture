const fs = require("fs");
const FeatureProject = require("../models/featureProjectModel");

exports.add = async (req, res) => {
  const image = req?.file?.filename;
  const { title, description } = req.body;

  try {
    const newFeatureProject = await FeatureProject.create({
      title,
      description,
      image: `featureProjects/${image}`,
    });

    res.status(201).json({
      success: true,
      message: "Feature Project created successfully",
      data: newFeatureProject,
    });
  } catch (error) {
    if (image) {
      fs.unlink(`./uploads/featureProjects/${image}`, (err) => {
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
    const featureProjects = await FeatureProject.find();

    if (!featureProjects || featureProjects.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No feature projects found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Feature Projects fetched successfully",
      data: featureProjects,
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
    const featureProject = await FeatureProject.findById(id);

    if (!featureProject) {
      return res.status(404).json({
        success: false,
        message: "Feature Project not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Feature Project fetched successfully",
      data: featureProject,
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
    const existingFeatureProject = await FeatureProject.findById(id);

    if (!existingFeatureProject) {
      if (image) {
        fs.unlink(`./uploads/featureProjects/${image}`, (err) => {
          if (err) console.error("Failed to delete uploaded image:", err);
        });
      }
      return res.status(404).json({
        success: false,
        message: "Feature Project not found",
      });
    }

    if (image && existingFeatureProject.image) {
      fs.unlink(`./uploads/featureProjects/${existingFeatureProject.image}`, (err) => {
        if (err) console.error("Failed to delete old image:", err);
      });
    }

    const updatedData = {
      title: title || existingFeatureProject.title,
      description: description || existingFeatureProject.description,
      image: image ? `featureProjects/${image}` : existingFeatureProject.image,
    };

    const updatedFeatureProject = await FeatureProject.findByIdAndUpdate(id, updatedData, { new: true });

    res.status(200).json({
      success: true,
      message: "Feature Project updated successfully",
      data: updatedFeatureProject,
    });
  } catch (error) {
    if (image) {
      fs.unlink(`./uploads/featureProjects/${image}`, (err) => {
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
    const featureProject = await FeatureProject.findById(id);

    if (!featureProject) {
      return res.status(404).json({
        success: false,
        message: "Feature Project not found",
      });
    }

    if (featureProject.image) {
      fs.unlink(`./uploads/featureProjects/${featureProject.image}`, (err) => {
        if (err) console.error("Failed to delete image:", err);
      });
    }

    await FeatureProject.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Feature Project deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};