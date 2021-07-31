const jwt = require("jsonwebtoken");

class AuthController {
	async getAccessToken(req, res, next) {
		try {
			const body = {
				id: req.user._id,
				role: req.user.role,
				email: req.user.email,
				username: req.user.username,
			};

			//generate access token
			const token = jwt.sign(
				{
					user: body,
				},
				process.env.JWT_SECRET,
				{ expiresIn: "1h" },
				{ algorithm: "RS256" }
			);

			return res
				.status(200)
				.json({
					message: "success",
					accessToken: token,
				});
		} catch (error) {
			if (!error.statusCode) {
				error.statusCode = 500;
				error.message = "Internal Server Error";
			}
			next(error);
		}
	}
}

module.exports = new AuthController();
