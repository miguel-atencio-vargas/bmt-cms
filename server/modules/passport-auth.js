const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Admin = require('../models/admin');


passport.use(new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password'
}, async ( email, password, done ) => {
	const admin = await Admin.findOne({ email });
	if( admin ){
		const match = await admin.verifyPassword(password);
		if ( match ) {
			return done(null, admin, { message: `Bienvenido ${admin.email} al CMS de BMT` });
		} else {
			return done(null, false, { message: '(Email o) contraseña incorrecta.' });
		}
	}
	return done(null, false, { message: 'Email (o contraseña) incorrecto.' });
}));



passport.serializeUser((admin, done) => {
	console.log("serializeAdmin", admin);
	delete admin.password;
	done(null, admin.id);
});

passport.deserializeUser((id, done) => {
	console.log("deserializeAdmin", id);
	Admin.findById(id, (err, admin) => {
		console.log("======= Admin ========");
		console.log(admin);
		done(err, admin)
	});
});
