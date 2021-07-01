const {Schema, model} = require("mongoose")
const reactionSchema = require("./reactions")

const giffSchema = new Schema({
    title: {
        type: String
    },
    url: {
        type: String
    },
    reactions: [reactionSchema]
}, {
    toJSON:{
        getters: true
    }
})

giffSchema.virtual("reactionCount").get(function(){
    return this.reactions.length
})

const Giff = model("Giff", giffSchema)
module.exports = Giff