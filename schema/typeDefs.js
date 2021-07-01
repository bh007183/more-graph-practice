const {gql} = require("apollo-server-express")

const typeDefs = gql`


type User{
    _id: ID
    username: String
    password: String
    giffs: [Giff]
    friends: [User]
}
type Reaction{
    _id: ID
    like: Boolean
}
type Giff{
    _id: ID
    title: String
    url: String
    reactions: [Reaction]
}

type Auth{
    user: ID!
    data: User
}

type Query{
    _id: ID
    getMyGiffs: [Giff]
    getFriendsGiffs: [User]


}

type Mutation{
    postUser(username: String!, password: String!): User
    login(username: String!, password: String!): Auth
    addFriend(_id: ID!): User
    postGiff(title: String!, url: String!): Giff
    likeGiff(reactions: Boolean): [Reaction]
}


`

module.exports = typeDefs