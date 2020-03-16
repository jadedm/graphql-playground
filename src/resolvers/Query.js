const Query = {
    users(parent, args, ctx, info) {
        if (!args.query) {
            return ctx.db.users
        }
        return ctx.db.users.filter(user => user.name.toLowerCase().includes(args.query.toLowerCase()))
    },

    posts(parent, args, ctx, info) {
        if (!args.query) {
            return ctx.db.posts
        }

        return ctx.db.posts.filter(post => post.title.toLowerCase().includes(args.query.toLowerCase()) || post.body.toLowerCase().includes(args.query.toLowerCase()))
    },

    comments(parent, args, ctx, info) {
        if (!args.query) {
            return ctx.db.comments
        }

        return ctx.db.comments.filter(comment => comment.text.toLowerCase().includes(args.query.toLowerCase()))
    }

}

export { Query as default }