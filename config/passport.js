const GoogleStrategy = require('passport-google-oauth20').Strategy
const pool = require('./db')

module.exports = function (passport) {
	passport.use(
		new GoogleStrategy(
			{
				clientID: process.env.GOOGLE_CLIENT_ID,
				clientSecret: process.env.GOOGLE_CLIENT_SECRET,
				callbackURL: '/auth/google/callback',
			},
			async (accessToken, refreshToken, profile, done) => {
				try {
					let user = await pool.query('SELECT * FROM users WHERE google_profile = $1 LIMIT 1', [profile])
					if (!user) {
						await pool.query('INSERT INTO users (google_profile VALUES ($1)', [profile])
					}
					done(null, profile)
				} catch (err) {
					console.error(err)
				}
			}
		)
	)

	passport.serializeUser((user, done) => {
		done(null, user)
	})

	passport.deserializeUser((obj, done) => {
		done(null, obj)
	})
}
