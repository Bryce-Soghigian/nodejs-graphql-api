const {ApolloServer} = require("apollo-server");
const fs = require('fs');
const path = require('path');

//=====Dummy Data =====//

let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  }]


// The object here is the actual implementation of the GraphQL schema.
let idCount = links.length
const resolvers = {
    Query : {
        info: () => `Welcome to graphql brother`,
        feed: () => links,
    },
    Mutation:{
        post:(parent,args) => {
            const link = {
                id:`link-${idCount++}`,
                description: args.description,
                url: args.url
            }
            links.push(link)
            console.log(links)
            return link
        }
    },
}

const server = new ApolloServer({
    typeDefs: fs.readFileSync(
        path.join(__dirname, 'schema.graphql'),
        'utf8'
    ),
    resolvers
})


server.listen()
.then(({url}) => 
console.log(`Server is running on ${url}`)
)