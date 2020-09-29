const mongoose = require('mongoose')

const PostSchema = mongoose.Schema(
	{
		title: String,
		description: String,
		content: String,
		author_id: String,
		claps: Number,
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Note', PostSchema)
