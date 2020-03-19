const Subscription = {
	count: {
		subscribe(parent, args, ctx, info) {
			const { pubsub } = ctx

			let count = 0
			setInterval(() => {
				count++
			}, 1000)
			
			return pubsub.asyncIterator('count')
		}
	},
	comment: {
		subscribe(parent, args, ctx, info) {
			const { postID } = args
			const { db, pubsub } = ctx

			const post = db.posts.find(post => post.id === postID && post.published)

			if (!post) {
				throw new Error('Post not found')
			}

			return pubsub.asyncIterator(`comment ${postID}`)
		}
	},
	post: {
		subscribe(parent, args, ctx, info) {
			const { db, pubsub } = ctx
			return pubsub.asyncIterator(`post`)
		}
	}
}

export { Subscription as default }