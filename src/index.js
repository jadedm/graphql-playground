import { GraphQLServer } from 'graphql-yoga';

const typeDefs = `
    type Query {
        title: String!
        price: Float!
        releaseYear: Int
        rating: Float
        inStock: Boolean!
    }
`;

const resolvers = {
    Query: {
        title() {
            return `Casio Tread`
        },
        price() {
            return 5001.99
        },
        releaseYear() {
            return 1999
        },
        rating() {
            return 3.5
        },
        inStock() {
            return true
        }
    }
}

const server = new GraphQLServer({ typeDefs, resolvers });

server.start(() => console.log(`Server is up and running!`));

/*
import { GraphQLServer } from 'graphql-yoga';

// Type definitions (Schema)
const typeDefs = `
    type Query {
        id: ID!
        name: String!
        age: Int!
        employed: Boolean!
        gpa: Float 
    }
`;

// Resolvers
const resolvers = {
    Query: {
        id() {
            return 'abc123'
        },
        name() {
            return `Clark`
        },
        age() {
            return 30
        },
        employed() {
            return true
        },
        gpa() {
            return null
        }
    }
}

// setup server
const server = new GraphQLServer({
    typeDefs,
    resolvers
});

// Start the server
server.start(() => { console.log(`Server running on port 4000`); });
*/
/*
// Basic query setup
import { GraphQLServer } from 'graphql-yoga';

// Scalar types - String, Boolean, Int, Float, ID
const typeDefs = `
    type Query {
        hello: String!
        name: String!
        location: String!
        bio: String!
    }
`

const resolvers = {
    Query: {

        hello() {
            return `This is my first query`
        },
        
        name() {
            return `Clark`
        },

        location() {
            return `Pune`
        },

        bio() {
            return `Clark is from smallville`
        }
    }
}

const server = new GraphQLServer({
    typeDefs, 
    resolvers
});

server.start(() => console.log(`Server is running`));
*/
