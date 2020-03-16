/*
import { GraphQLServer } from 'graphql-yoga';

const users = [{
    id: '1',
    name: 'Clark',
    email: 'clark@example.com',
    age: 28
}, {
    id: '2',
    name: 'Bruce',
    email: 'bruce@example.com'
}, {
    id: '3',
    name: 'diana',
    email: 'diana@example.com'
}];

const posts = [{
    id: '1',
    title: 'Lorem ipsum',
    body: 'lorem ipsum dolor sit',
    published: true,
    author: '1'
}, {
    id: '2',
    title: 'Ipsum dolor',
    body: 'Ipsum dolor sit amet',
    published: false,
    author: '2'
}, {
    id: '3',
    title: 'dolor sit',
    body: 'dolor sit amet',
    published: true,
    author: '1'
}]

const comments = [{
    id: 'a1',
    text: 'lorem ipsum dolor sit amet',
    author: '1',
    post: '2'
}, {
    id: 'b1',
    text: 'ipsum dolor sit amet lorem',
    author: '1',
    post: '3'
}, {
    id: 'c1',
    text: 'dolor sit amet lorem ipsum',
    author: '3',
    post: '3'
}, {
    id: 'd1',
    text: 'sit lorem ipsum amet dolor',
    author: '2',
    post: '2'
}];

const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        comments(query: String): [Comment!]!
        me: User!
        post: Post!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments: [Comment!]!
    }

    type Comment {
        id: ID!
        text: String!
        author: User!
        post: Post!
    }
`

const resolvers = {
    Query: {
        users(parent, args, ctx, info) {
            if (!args.query) {
               return users
            }

            return users.filter((user) => {
                return user.name.toLowerCase().includes(args.query.toLowerCase())
            })

        },

        me() {
            return {
                id: '123abc',
                name: 'Clark',
                email: 'clark@email.com'
            }
        },

        posts(parent, args, ctx, info) {
            if (!args.query) {
               return posts
            }
            return posts.filter((post) => {
                return post.title.toLowerCase().includes(args.query.toLowerCase()) || post.body.toLowerCase().includes(args.query.toLowerCase())
            });
        },

        post() {
            return {
                id: 'qwer1234',
                title: 'the art of war',
                body: 'lorem ipsum dolor sit amet',
                published: false
            }
        },

        comments(parent, args, ctx, info) {
            if (!args.query) {
                return comments
            }
        }

    },

    Post: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author;
            })
        },

        comments(parent, args, ctx, info) {
            return comments.filter(comment => comment.post === parent.id)
        }
    },

    User: {
        posts(parent, args, ctx, info) {
            return posts.filter(post => post.author === parent.id)
        },

        comments(parent, args, ctx, info) {
            return comments.filter(comment => comment.author === parent.id)
        }

    },

    Comment: {
        author(parent, args, ctx, info) {
            return users.find(user => user.id === parent.author);
        },
        post(parent, args, ctx, info) {
            return posts.find(post => post.id === parent.post)
        }
    }
}

const server = new GraphQLServer({ typeDefs, resolvers })

server.start(() => console.log('Server is up and running!'))
*/
/*
import { GraphQLServer } from 'graphql-yoga';

const typeDefs = `
    type Query {
        greeting(name: String): String!
        add(numbers: [Float!]!): Float!
        grades: [Int!]!
        me: User!
        post: Post!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
    }
`

const resolvers = {
    Query: {
        me() {
            return {
                id: '123abc',
                name: 'Clark',
                email: 'clark@example.com',
                age: 29
            }
        },

        post() {
            return {
                id:'abc123',
                title: 'Lorem',
                body: 'Ipsum dolor sit',
                published: true
            }
        },

        greeting(parent, args, ctx, info) {
           if (args.name) {
              return `Hello ${args.name}` 
           } else {
               return `Hello`
           }
        },

        add(parent, args, ctx, info) {
            if (args.numbers.length === 0) {
                return 0;
            }
            return args.numbers.reduce((acc, curr, index, arr) => {
                return acc + curr;
            },0);
        },

        grades(parent, args, ctx, info) {
            return [88, 91, 56]
        }

    }
}

const server = new GraphQLServer({ typeDefs, resolvers });

server.start(() => console.log('Server is up and running!'));
*/
/*
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
*/
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