import uuidv4 from 'uuid/v4';

const Mutation = {
    createUser(parent, args, ctx, info) {
        const emailTaken = ctx.db.users.some(user => user.email === args.data.email);
        if (emailTaken) {
            throw new Error('Email taken');
        }

        const user = {
            id: uuidv4(),
            ...args.data
        }

        ctx.db.users.push(user);
        return user;
    },

    deleteUser(parent, args, ctx, info) {
        const userIndex = ctx.db.users.findIndex(user => user.id === args.id);
        if (!userIndex) {
            throw new Error('User not found!')
        }
        const deletedUser = ctx.db.users.splice(userIndex, 1);
        ctx.db.posts = ctx.db.posts.filter(post => {
            // finding posts created by the user[deleted]
            const match = post.author === args.id
            if (match) {
                // deleting comments of matched posts by user
                ctx.db.comments = ctx.db.comments.filter(comment => comment.post !== post.id)
            }
            // deleting posts created by the user[deleted]
            return !match
        })
        // delete posts created by user in different posts created by the author
        ctx.db.comments = ctx.db.comments.filter((comment) => comment.author !== args.id)

        return deletedUser[0];
    },

    updateUser(parent, args, ctx, info) {
        const { id, data } = args
        const { db } = ctx
        const user = db.users.find(user => user.id === id);

        if(!user) {
            throw new Error('User not found')
        }

        if (typeof data.email === 'string') {
            const emailTaken = db.users.some(user => user.email === data.email)

            if (emailTaken) {
                throw new Error('Email already in use')
            }
            user.email = data.email
        }

        if (typeof data.name === 'string') {
            user.name = data.name
        }

        if (typeof data.age !== 'undefined') {
            user.age = data.age
        }

        return user
    },

    createPost(parent, args, ctx, info) {
        const { db, pubsub } = ctx
        const { data } = args
        const userExists = db.users.some(user => user.id === data.author)
        if (!userExists) {
            throw new Error('User not found');
        }

        const post = {
            id: uuidv4(),
            ...data
        }

        db.posts.push(post)

        if (data.published) {
            pubsub.publish('post', { post })
        }

        return post;
    },

    deletePost(parent, args, ctx, info) {
        const postIndex = ctx.db.posts.findIndex(post => post.id === args.id);
        if (postIndex === -1) {
            throw new Error("Post not found");
        }
        const deletedPosts = ctx.db.posts.splice(postIndex, 1);

        ctx.db.comments = ctx.db.comments.filter(comment => comment.post !== args.id);

        return deletedPosts[0];
    },

    updatePost(parent, args, ctx, info) {
        const { id, data } = args
        const { db } = ctx

        const post = db.posts.find(post => post.id === id)

        if (!post) {
            throw new Error('Post not found')
        }

        if (typeof data.title === 'string') {
            post.title = data.title
        }

        if (typeof data.body === 'string') {
            post.body = data.body
        }

        if (typeof data.published === 'boolean') {
            post.published = data.published
        }

        return post
    },

    createComment(parent, args, ctx, info) {
        const { db, pubsub } = ctx
        const { data } = args
        const userExists = db.users.some(user => user.id === data.author);
        const postPublished = db.posts.some(post => post.id === data.post && post.published);
        if (!userExists || !postPublished) {
            throw new Error('Unable to find user and the post')
        }

        const comment = {
            id: uuidv4(),
            ...data
        }

        db.comments.push(comment)
        pubsub.publish(`comment ${data.post}`, { comment })

        return comment
    },

    updateComment(parent, args, ctx, info) {
        const { id, data } = args
        const { db } = ctx

        const comment = db.comments.find(comment => comment.id === id)

        if (!comment) {
            throw new Error('Comment not found')
        }

        if (typeof data.text === 'string') {
            comment.text = data.text
        }

        return comment
    },

    deleteComment(parent, args, ctx, info) {
        const commentIndex = ctx.db.comments.findIndex(comment => comment.id === args.id)
        if (commentIndex === -1) {
            throw new Error('Comment not found')
        }
        const deletedComments = ctx.db.comments.splice(commentIndex, 1);

        return deletedComments[0];
    },
}

export { Mutation as default }