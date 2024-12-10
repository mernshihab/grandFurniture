const mongoose = require("mongoose");

const clientSchema = mongoose.Schema({
  logo: {
    type: String,
    required: true,
  },
});

const Client = mongoose.model("Client", clientSchema);
module.exports = Client;