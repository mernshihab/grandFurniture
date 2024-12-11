const fs = require("fs");
const AboutUs = require("../models/aboutModel");

exports.createAboutUs = async (req, res) => {
  const image = req?.files?.image?.[0]?.filename; // Main image
  const featureProductImages = req?.files?.featureProductImages || [];
  const data = req?.body;

  let featureProduct = [];
  if (data.featureProduct) {
    try {
      featureProduct = JSON.parse(data.featureProduct); // Parse the featureProduct string
      featureProduct = featureProduct.map((product, index) => ({
        ...product,
        image: featureProductImages[index]?.filename || product.image || "",
      }));
    } catch (err) {
      return res.json({
        success: false,
        message: "Invalid featureProduct format",
      });
    }
  }

  const aboutUs = {
    ...data,
    image,
    featureProduct,
  };

  try {
    const result = await AboutUs.create(aboutUs);

    res.status(201).json({
      success: true,
      message: "About Us created successfully",
      data: result,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

exports.getAboutUs = async (req, res) => {
  try {
    const result = await AboutUs.find();

    if (!result) {
      return res.json({
        success: false,
        message: "About Us not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "About Us fetched successfully",
      data: result,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

exports.updateAboutUs = async (req, res) => {
  const id = req?.params?.id;
  const image = req?.files?.image?.[0]?.filename; // Main image
  const featureProductImages = req?.files?.featureProductImages || [];
  const data = req?.body;

  let featureProduct = [];
  if (data.featureProduct) {
    try {
      featureProduct = JSON.parse(data.featureProduct); // Parse the featureProduct string
      featureProduct = featureProduct.map((product, index) => ({
        ...product,
        image: featureProductImages[index]?.filename || product.image || "",
      }));
    } catch (err) {
      return res.json({
        success: false,
        message: "Invalid featureProduct format",
      });
    }
  }

  try {
    const isExist = await AboutUs.findById(id);

    if (!isExist) {
      return res.json({
        success: false,
        message: "About Us not found",
      });
    }

    let newData;

    if (image) {
      fs.unlink(`./uploads/aboutus/${isExist.image}`, (err) => {
        if (err) {
          console.log(err);
        }
      });

      newData = {
        ...data,
        image,
        featureProduct,
      };
    } else {
      newData = { ...data, featureProduct };
    }

    const result = await AboutUs.findByIdAndUpdate(id, newData, {
      new: true,
    });

    if (!result) {
      return res.json({
        success: false,
        message: "About Us not updated",
      });
    }

    res.status(200).json({
      success: true,
      message: "About Us updated successfully",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
