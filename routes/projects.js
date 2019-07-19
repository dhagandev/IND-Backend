var express = require('express');
var router = express.Router();
var db = require('../lib/firebaseClient');

let projectsRef = db.collection('Projects');

router.post('/addProject', function(req, res, next){
	console.log('Add Project function')
	let title = req.body.projectInfo.projectTitle
	let useruid = req.body.projectInfo.useruid
	console.log(req.body.projectInfo.useruid)
	let project = {
		'title': title,
		'chapters': [],
		'created-by': useruid,
		'created-date': Date.now(),
		'owner': useruid,
		'tracks': [],
		'updated-date': Date.now(),
		'version': '0.0.0'
	}

	projectsRef.add(project)
		.then(ref => {
			console.log(ref.id)
			let userDoc = db.collection('UserProfile').doc(useruid)
			userDoc.get()
				.then(doc => {
					let snapshot = doc.data();
					let userProjects = snapshot.projects;
					userProjects.push(ref.id)
					userDoc.update({
						projects: userProjects
					})

				})
		})

	res.send({'project': project})
})

router.get('/getProject/:id', function(req, res, next) {
	let id = req.params.id
	projectsRef.doc(id).get()
		.then(ref => {
			let project = ref.data()
			console.log(project)
			res.send({'projectInfo': project})
		})
		.catch(err => { console.log(err) })
})

router.delete('/deleteProject/:id', function(req, res, next) {
	console.log("Function called to delete")
	let id = req.params.id
	let user = req.query.u
	let deletedDoc = projectsRef.doc(id).get()
						.then(ref => {
							return ref.data()
						})
	projectsRef.doc(id).delete()
	extensiveProjectDelete(deletedDoc, id, user)
	res.send({'deleted': deletedDoc})
})

function extensiveProjectDelete(deletedDoc, id, user) {
	let deleteChapters = deletedDoc
	// deleteChapters.forEach(chapter => {
	// 	let chapterDoc = db.collection('Chapters').doc(chapter).get()
	// 						.then(ref => {
	// 							return ref.data()
	// 						})
	// 	let deleteScenes = chapterDoc.scenes
	// 	deleteScenes.forEach(scene => {
	// 		let sceneDoc = db.collection('Scenes').doc(scene).get()
	// 						.then(ref => {
	// 							return ref.data()
	// 						})

	// 		db.collection('Scenes').doc(scene).delete()
	// 	})
	// 	db.collection('Chapters').doc(chapter).delete()
	// })
	db.collection('UserProfile').doc(user).get()
		.then(snapshot => {
			let userInfo = snapshot.data()
			let updateArr = userInfo.projects
			let position = updateArr.indexOf(id)
			if (index > -1) {
				updateArr.splice(position, 1)
			}
			userInfo.update({
				projects: updateArr
			})
		})
}

module.exports = router;
