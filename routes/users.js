var express = require('express');
var router = express.Router();
var db = require('../lib/firebaseClient');

let usersRef = db.collection('UserProfile');

/* GET users listing. */
router.get('/test', function(req, res, next) {
	res.send('respond with a resource');
});

router.get('/test/getAllUsers', function(req, res, next) {
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

router.post('/addUser', function(req, res, next){
	let currUser = req.body.userInfo
	let userProfile = {
      'uid': currUser.uid,
      'displayName': currUser.displayName,
      'email': currUser.email,
      'photoURL': currUser.photoURL,
      'emailVerified': currUser.emailVerified,
      'payment-ref': null,
      'projects': []
    }

    usersRef.doc(currUser.uid).get()
    	.then((docSnapshot) => {
    		if (docSnapshot.exists) {
    			res.send({"profile": docSnapshot.data()})
    		} else {
    			usersRef.doc(currUser.uid).set(userProfile);
				res.send({"profile": userProfile})
    		}
    	})

    
})

module.exports = router;
