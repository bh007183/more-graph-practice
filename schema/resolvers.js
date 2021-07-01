const Giff = require("../models/giff")
const User = require("../models/user")
const {AuthenticationError} = require("apollo-server-express")
const {sign} = require("../utils/auth")


const resolvers = {
    Query: {
        getMyGiffs: async function(parent, args){
            return


        },
        getFriendsGiffs: async function(parent, args, context){
            console.log(context.user)
            if(!context.user){
                throw new AuthenticationError("Session closed")
            }else{
                const data = await User.findById(context.user._id).select("-password").populate("friends").populate("giffs") || []
                return data

            }
        }

    },
    Mutation: {
        postUser: async function(parent, arg){
            return User.create(arg)
            

        },
        login: async function(parent, {username, password}){
            let user = await User.findOne({username})
            if(!user){
                throw new AuthenticationError("Invalid Credentials") 
            }
            const correctPass = user.passCheck(password)

            if(!correctPass){
                throw new AuthenticationError("Invalid Credentials") 
            }
            const token =  sign(user)
            
            return {token, user}


            

        },
        addFriend: async function(parent, args){
            console.log(args)

        },
        postGiff: async function(parent, args){
            console.log(args)

        },
        likeGiff: async function(parent, args){
            console.log(args)
        }
    }
}

module.exports = resolvers