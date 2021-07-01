
const {Schema, model} = require("mongoose")


const reactionSchema = new Schema({
    like: {
        type: Boolean
    },
     
})


module.exports = reactionSchema