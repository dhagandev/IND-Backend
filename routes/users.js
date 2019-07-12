var express = require('express');
var router = express.Router();

const admin = require('firebase-admin');

let serviceAccount = require('../config/service-account.json');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});

// admin.initializeApp({
//   credential: admin.credential.cert({
//     "type": process.env.FIREBASE_TYPE,
//     "project_id": process.env.FIREBASE_PROJECT_ID,
//     "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
//     "private_key": `process.env.FIREBASE_PRIVATE_KEY`.replace(/\\n/g, '\n'),
//     "client_email": `process.env.FIREBASE_CLIENT_EMAIL`,
//     "client_id": process.env.FIREBASE_CLIENT_ID,
//     "auth_uri": process.env.FIREBASE_AUTH_URI,
//     "token_uri": process.env.FIREBASE_TOKEN_URI,
//     "auth_provider_x509_cert_url": process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
//     "client_x509_cert_url": process.env.FIREBASE_CLIENT_X509_CERT_URL
//   })
// });

let db = admin.firestore();

/* GET users listing. */
router.get('/test', function(req, res, next) {
	res.send('respond with a resource');
});

router.get('/test/getAllUsers', function(req, res, next) {
	let usersRef = db.collection('UserProfile')
	let usersResult = {}
	let allUsers = usersRef.get()
		.then(snapshot => {
			snapshot.forEach(doc => {
				usersResult[doc.id] = doc.data()
			})
		})
		.then(() => {
			res.send({data: usersResult});
		})
})

router.post('/test/postNewUser', function(req, res, next) {
	let usersRef = db.collection('UserProfile')
	let postExample = {
		email: "2-testemail@gmail.com",
		emailVerified: false,
		name: "2-profile-test-name",
		role: "writer"
	}
	console.log(req.body)
	let reqPost = {}
	//Add will autogen id
	//Data will come from req.body
	// usersRef.add(postExample);
})

module.exports = router;
