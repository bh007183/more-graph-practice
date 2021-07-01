const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:Giff", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false

})

module.exports = mongoose.connection