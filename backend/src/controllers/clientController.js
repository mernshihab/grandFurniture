const Client = require("../models/clientModel");
const fs = require("fs");

exports.add = async (req, res) => {
  const file = req?.file?.filename;

  if (!file) {
    return res.json({
      success: false,
      message: "Please upload an image",
    });
  }

  try {
    const result = await Client.create({ logo: `clients/${file}` });

    if (!result) {
      return res.json({
        success: false,
        message: "Client not added",
      });
    }

    res.status(200).json({
      success: true,
      message: "Client added successfully",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });

    fs.unlink(`./uploads/clients/${file}`, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    const result = await Client.find({});

    if (!result) {
      return res.json({
        success: false,
        message: "Clients not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Clients fetched successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.destroy = async (req, res) => {
  const id = req?.params?.id;

  try {
    const result = await Client.findByIdAndDelete(id);

    if (!result) {
      return res.json({
        success: false,
        message: "Client not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Client deleted successfully",
      data: result,
    });

    fs.unlink(`./uploads/${result?.image}`, (err) => {
      if (err) {
        console.log(err);
      }
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
};