const mongoose = require('mongoose');

async function dbConnect() {
	try {
		mongoose.connect('mongodb://127.0.0.1:27017/freeshop');
		const database = await mongoose.connection;

		database.on('error', (error) => {
			console.error(error);
		});

		database.once('connected', () => {
			console.log('Database Connected');
		});
	} catch (err) {
		console.error(err);
	}
}
module.exports = dbConnect;
