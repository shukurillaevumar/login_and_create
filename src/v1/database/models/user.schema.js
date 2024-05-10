const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
		},
		role: {
			type: String,
			enum: ['USER', 'ADMIN', 'MODIRATOR'],
			required: true,
			default: 'USER',
		},
		email: {
			type: String,
		},
		active: {
			type: Boolean,
			required: true,
		},
		user_name: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		created_at: {
			type: Number,
			required: true,
		},
		updated_at: {
			type: Number,
			required: true,
		},
	},
	{versionKey: false},
);

module.exports = mongoose.model('User', userSchema);
