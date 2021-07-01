const {Schema, model} = require("mongoose")
const bcrypt = require("bcrypt")


const userSchema = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    giffs:[
        {
            type: Schema.Types.ObjectId,
            ref: "Giff"
        }

    ] ,
    friends:[
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }

    ]
     
})

userSchema.pre('save', async function(next){
    if(this.isNew || this.isModified('password')){
        const saltRounds = 10
        this.password = await bcrypt.hash(this.password, saltRounds)

    }
    next()

})

userSchema.methods.passCheck = async function(password){

return bcrypt.compare(password, this.password)

}

const User = model("User", userSchema)
module.exports = User