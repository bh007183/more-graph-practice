const jwt = require("jsonwebtoken")

module.exports = {
    sign: function ({username, _id}){
        return jwt.sign({data: {username, _id}}, "secret", {expiresIn: "1hr"} )

    },
    authMiddleware: function ({req}){
       
        
        let token = req.headers.authorization
        if(req.headers.authorization){
            token = req.headers.authorization.split(" ")[1]
        }
        if(!token){
        return req
        }
        try{
            const {data} = jwt.verify(token, "secret")
            req.user = data

        }catch(err){
            console.log(err)
            console.log('Invalid token')
        }
        
      
        return req


    }
    
}