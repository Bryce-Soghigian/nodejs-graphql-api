const {ApolloServer} = require("apollo-server");

//=====Dummy Data =====//

let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  }]

// The exclaimation point means that the info field is required. Its like notNullable in sql
const typeDefs = `
type Query {
    info: String!
    feed : [Link!]!
}

type Link {
    id: ID!
    description : String!
    url: String!
}
`
// The object here is the actual implementation of the GraphQL schema.
const resolvers = {
    Query : {
        info: () => `Welcome to graphql brother`,
        feed: () => links,
    },
    Link : {
        id: (parent) => parent.id,
        description: (parent) => parent.description,
        url: (parent) => parent.url,
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})


server.listen()
.then(({url}) => 
console.log(`Server is running on ${url}`)
)