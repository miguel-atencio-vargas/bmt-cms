const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const Admin = require('../models/admin')



passport.use(new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password'
}, async (email, password, done) => {
	const admin = await Admin.findOne({ email })
	if( admin ){
		const match = await admin.verifyPassword(password)
		if (match) {
			return done(null, admin) // this is sending to controller TODO: make controller functionality login.
		} else {
			return done(null, false, { message: 'Incorrect password' })
		}
	}else{
		return done(null, false, { message: 'No admin found' })
	}
}))

passport.serializeUser((admin, done) => {
	console.log("serializeUser", admin);
	done(null, admin.id)
})

passport.deserializeUser((id, done) => {
	console.log("deserializeUser", id);
	Admin.findById(id, (err, admin) => {
		done(err, admin)
	})
})
