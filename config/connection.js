const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/giff", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false

})

module.exports = mongoose.connection