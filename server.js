const express = require("express")
const app = express()
const {ApolloServer} = require("apollo-server-express")
const db = require("./config/connection")
const {resolvers, typeDefs} = require("./schema")
const {authMiddleware} = require("./utils/auth")

PORT = process.env.PORT || 3001

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware
})

server.applyMiddleware({app})
app.use(express.urlencoded({extended: true}))
app.use(express.json())

db.once('open', () => {
    console.log("db connected")

    app.listen(PORT, ()=>{
        console.log( `server running at http://localhost:${PORT}`)
        console.log(`http://localhost:${PORT}${server.graphqlPath}`)

    })

})
