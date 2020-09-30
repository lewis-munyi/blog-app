const { String } = require('core-js')
const mongoose = require('mongoose')

const PostSchema = mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: String,
		brief: String,
		content: {
			type: String,
			required: true,
		},

		claps: Number,
		cover: {
			type: String,
			required: true,
		},
		author_id: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
		},
		author: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Post', PostSchema)
