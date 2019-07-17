var express = require('express');
var router = express.Router();
var db = require('../lib/firebaseClient');

let chaptersRef = db.collection('Chapters');

router.post('/addChapter', function(req, res, next){
	console.log('Add Chapter function')
	let title = req.body.chapterInfo.chapterTitle
	let useruid = req.body.chapterInfo.useruid
	let projectId = req.body.chapterInfo.projectId
	console.log(req.body.chapterInfo.useruid)
	let chapter = {
		'title': title,
		'scenes': [],
		'created-by': useruid,
		'created-date': Date.now(),
		'updated-date': Date.now()
	}

	chaptersRef.add(chapter)
		.then(ref => {
			console.log(ref.id)
			let chapDoc = db.collection('Project').doc(projectId)
			chapDoc.get()
				.then(doc => {
					let snapshot = doc.data();
					let projectChapters = snapshot.chapters;
					projectChapters.push(ref.id)
					chapDoc.update({
						scenes: projectChapters
					})

				})
		})

	res.send({'chapter': chapter})
})

module.exports = router;
