require("dotenv").config({
	path: `.env.${process.env.NODE_ENV}`,
});

//import Express framework
const express = require("express");
const app = express();

//Set body parser for HTTP post operation
app.use(express.json()); // support json encoded bodies
app.use(
	express.urlencoded({
		extended: true,
	})
); // support encoded bodies

// ROUTES DECLARATION & IMPORT
const authRoutes = require("./routes/authRoutes.js");
app.use("/auth", authRoutes);

//========================= Error Handler ==========================
app.use((err, req, res, next) => {
	const status = err.statusCode || 500;
	const message = err.message;
	const data = err.data;
	res.status(status).json({ success: false, message: message, data: data });
});
//========================= End Error Handler ======================

//======================== Listen Server / Up Server ===========================
let PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server running on PORT : ${PORT}`));
//======================== End Listen Server =======================