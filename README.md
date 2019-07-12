//Example of saving data using cafe example
// Form add event listener for submit
// Take the event and call preventDefault() 
// Save to form: db.collection('cafes').add({
//   document properties, access them through the form''s values, ie: form.name.value
// })
// Doesnt update in visual but does in db. I think its cause he's not using react.
// just in case, he suggests using dom manipulation to fix it.

//Deleting data from firestore
// Need some dom element to trigger the delete
// dom element add event listener, click event
// e.stopPropogation(); id = e.target.parentElement.getAttribute('data-id') - getting doc id
// db.collection('cafe').doc(id).delete()
// frontend nothing happens, not hooked up to realtime updates from db
// Thats it for delete

//Retrieve docs filtered by something
//db.collection('cafes').get().then(snapshot).etc etc
// tag on db.collection('cafes').where('field', 'evaluation, ie ==', 'value').get().then(snapshot).etc etc
//values are case sensitive
//can use < and > with strings, get things before/after value

//Ordering data
//Currently retrieving with no order
//db.collection('cafes').orderBy('property').get().then(snapshot).etc etc
//CASE SENSITIVE
//where comes before orderby
//Firebase sometimes makes you create an index, fb error will fo it for you, usually occurs with where and orderby in same deal

//Setting up realtime data/frontend response
//Essentially need a listen to db
//Realtime listener instead of .get()
//db.collection('cafes').onSnapshot(snapshot => {
//   let changes = snapshot.docChanges()
//   console.log(changes)
//    cycle through changes. if type is "added", display it. if it is "removed", do not render.
//    if (change.type === 'added') {render method (change.doc)}, if remove delete from dom:
// let li = cafeList.querySelector(by data-id equaling change.doc.id)
// cafeList.removeChild(li)
// }
//Init docs in db are "added"

//Updating data
// db.collection('cafes').doc('id').update({
// name: 'new value'
// })
//update completes with refresh

//Set - complete override with new props. 
//Called by .set({}), can lead to null/empty values