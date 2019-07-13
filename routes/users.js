var express = require('express');
var router = express.Router();

const admin = require('firebase-admin');

admin.initializeApp({
	credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT))
});

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
