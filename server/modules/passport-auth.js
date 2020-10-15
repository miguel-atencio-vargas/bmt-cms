const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Admin = require('../models/admin');


passport.use(new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password'
}, async ( email, password, done ) => {
	const adminDB = await Admin.findOne({ email });
	if( adminDB ){
		const match = await adminDB.verifyPassword(password);
		let adminObject = adminDB.toObject();
		delete adminObject['password'];
		if ( match ) {
			return done(null, adminObject, { message: `Bienvenido ${adminObject.email} al CMS de BMT` });
		} else {
			return done(null, false, { message: '(Email o) contraseña incorrecta.' });
		}
	}
	return done(null, false, { message: 'Email (o contraseña) incorrecto.' });
}));



passport.serializeUser((admin, done) => {
	console.log("serializeAdmin", admin);
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
