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

    createPost(parent, args, ctx, info) {
        const userExists = ctx.db.users.some(user => user.id === args.data.author)
        if (!userExists) {
            throw new Error('User not found');
        }

        const post = {
            id: uuidv4(),
            ...args.data
        }

        ctx.db.posts.push(post);

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

    createComment(parent, args, ctx, info) {
        const userExists = ctx.db.users.some(user => user.id === args.data.author);
        const postPublished = ctx.db.posts.some(post => post.id === args.data.post && post.published);
        if (!userExists || !postPublished) {
            throw new Error('Unable to find user and the post')
        }

        const comment = {
            id: uuidv4(),
            ...args.data
        }

        ctx.db.comments.push(comment);

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