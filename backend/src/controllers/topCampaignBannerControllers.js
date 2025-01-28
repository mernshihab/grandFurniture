const fs = require("fs");
const TopCampaignBanner = require("../models/topCampaignBannerModel");

exports.addTopCampaignBanner = async (req, res) => {
  try {
    const image = req?.file?.filename;
    if (!image) {
      return res.json({
        success: false,
        message: "Image is requred",
      });
    }

    const { title, description } = req.body;

    if (!title || !description || !image) {
      return res.json({
        success: false,
        message: "All fields are required",
      });
    }

    const result = await TopCampaignBanner.create({
      image,
      title,
      description,
    });

    if (!result) {
      if (image) {
        fs.unlink(`./uploads/banner/${image}`, (err) => {
          if (err) {
            console.error(err);
            return;
          }
        });
      }

      return res.json({
        success: false,
        message: "Top Campaign Banner not added",
      });
    }

    res.status(200).json({
      success: true,
      message: "Top Campaign Banner added success",
      data: result,
    });
  } catch (error) {
    if (image) {
      fs.unlink(`./uploads/banner/${image}`, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });
    }

    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.getTopCampaignBanner = async (req, res) => {
  try {
    const banner = await TopCampaignBanner.find({});

    if (!banner) {
      return res.json({
        success: false,
        message: "banner not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "banner found successfully",
      data: banner,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateBanner = async (req, res) => {
  try {
    const image = req?.file?.filename;
    const { title, description } = req.body;
    const id = req?.params?.id;

    if (!id) {
      return res.json({
        success: false,
        message: "Banner ID is required",
      });
    }

    const existingBanner = await TopCampaignBanner.findOne({ _id: id });

    if (!existingBanner) {
      if (image) {
        fs.unlink(`./uploads/banner/${image}`, (err) => {
          if (err) {
            console.error(err);
            return;
          }
        });
      }
      return res.json({
        success: false,
        message: "Banner not found",
      });
    }

    const updateData = {};
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (image) updateData.image = image;

    const updatedBanner = await TopCampaignBanner.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (image && existingBanner.image) {
      fs.unlink(`./uploads/banner/${existingBanner.image}`, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });
    }

    res.status(200).json({
      success: true,
      message: "Top Campaign Banner updated successfully",
      data: updatedBanner,
    });
  } catch (error) {
    if (image) {
      fs.unlink(`./uploads/banner/${image}`, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });
    }

    res.json({
      success: false,
      message: error.message,
    });
  }
};
