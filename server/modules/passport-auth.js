'use strict'
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const Admin = require('../models/admin')



// passport.use(new LocalStrategy({
// 	adminEmail: 'email',
// 	adminPassword: 'password'
// }, async (email, password, done) => {
// 	// Match Email User
// 	const admin = await Admin.findOne({email})
// 	if(!admin){
// 		console.log("admin: ", admin);
// 		return done(null, false, { message:'No admin found' })
// 	}else{
// 		//Match password admin
// 		console.log("admin: ", admin);
// 		const match = await admin.matchPassword(password)
// 		if(match){
// 			return done(null, admin)
// 		}else{
// 			return done(null, false, { message: 'Incorrect password' })
// 		}
// 	}
// }))
passport.use(new LocalStrategy(
	function(email, password, done) {
		User.findOne({ email }, function (err, admin) {
			console.log("Strategy!!!!!!");
			if (err) { return done(err); }
			if (!admin) { return done(null, false); }
			if (!admin.verifyPassword(password)) { return done(null, false); }
			return done(null, admin);
		});
	}
));

passport.serializeUser((admin, done) => {
	done(null, admin.id)
})

passport.deserializeUser((id, done) => {
	Admin.findById(id, (err, admin) => {
		done(err, admin)
	})
})
