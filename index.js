const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const movieRoute = require("./routes/movies");
const listRoute = require("./routes/lists");

dotenv.config();
const path = require('path');

SECRET_KEY = 'netflix';

mongoose
	.connect(
		'mongodb+srv://netflix:netflix@netflix.fp9rf.mongodb.net/netflix?retryWrites=true&w=majority',
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		},
	)
	.then(() => console.log('DB Connection Successfull'))
	.catch(err => {
		console.error(err);
	});

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/movies", movieRoute);
app.use("/api/lists", listRoute);

app.use(express.static(path.join(__dirname, '/client/build')));

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});

app.listen(process.env.PORT || 5000, () => {
	console.log('Backend server is running!');
});
