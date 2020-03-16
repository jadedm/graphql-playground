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
}]

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
    text: 'lorem ipsum',
    author: '1',
    post: '2'
}, {
    id: 'b1',
    text: 'ipsum dolor ',
    author: '1',
    post: '3'
}, {
    id: 'c1',
    text: 'sit amet',
    author: '3',
    post: '3'
}, {
    id: 'd1',
    text: 'sit lorem ipsum amet dolor',
    author: '2',
    post: '2'
}]

const db = {
    users,
    posts,
    comments
}

export { db as default }