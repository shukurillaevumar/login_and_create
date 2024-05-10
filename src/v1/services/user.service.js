const {generateToken} = require('../middleware/auth.middleware');
const usersModule = require('../module/users/user.module');

const register = async (user) => {
	//Prepare data for DB
	const userForDb = {
		...user,
		active: true,
		created_at: Date.now(),
		updated_at: Date.now(),
	};
	//Send ready data to the userModule to create it in DB
	const userDoc = await usersModule.create(userForDb);
	// Create token from _id of userDoc above
	const token = generateToken(userDoc._id);
	return token;
};

const login = async (user) => {
	const token = await generateToken(user.id);
	return token;
};

module.exports = {
	register,
	login,
};
