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
        addFriend: async function(parent, {username}, context){
           
            if(!context.user){
                throw new AuthenticationError("Session closed")
            }else{
                const friend = await User.findOne({username}).select('-password')
                if(friend){

                    const data = await User.findByIdAndUpdate(context.user._id, {$set: {friends: friend._id}}, { new: true }).select("-password").populate("friends")
                    return data

                }else{
                    throw new Error("No User Found")
                }

            }

        },
        postGiff: async function(parent, args, context){
            if(!context.user){
                throw new AuthenticationError("Session closed")
            }else{
                const friend = await User.findOne(args.username).select('-password')
                if(friend){

                    const data = await User.create(context.user._id, {$push: {giffs: friend._id}}, { new: true }).select("-password")
                    return data

                }else{
                    throw new Error("No User Found")
                }

            }

        },
        likeGiff: async function(parent, args){
            console.log(args)
        }
    }
}

module.exports = resolvers