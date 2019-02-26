//init firebase
firebase.initializeApp({
  apiKey: 'AIzaSyDo8Th41BZFvbKXktdzALz6rv5bs8DsFAU',
  authDomain: 'notetakerone.firebaseapp.com',
  projectId: 'notetakerone'
});
const db = firebase.firestore();
const settings = {timestampsInSnapshots: true};
db.settings(settings);
const notesDb = db.collection("notes");

// setup global variables
let title = "",
    body = "",
    timeStamp = "",
    uid = "",
    element = document.getElementById("testNote"),
    list = document.getElementById("notes_list"),
    notesCollection;
loadNotes();
//titleList();

// Below the array of note objects is iterated through adding html elements containing the properties of each note objects.
function loadNotes(){
  notesDb.get().then((notesSnapshot) => {
    notesCollection = notesSnapshot;
    displayNotes('all');
  });
};

function displayNotes(type){
  let filteredNotesCollection = [];
  if (type == "all") {
    filteredNotesCollection = notesCollection;
  } else {
    // either use firebase method OR convert to a regular js collection OR see if its possible to get js objecrt returned from firebase
    filteredNotesCollection.filter(function (note) {
      return note.type == type;
    });
  }
  element.innerHTML = "";
  filteredNotesCollection.forEach((thisData) => {
    if (thisData && thisData.exists) {
      let thisDBnote = thisData.data();
      let dbhtmlstring = `<div data-uid='${thisData.id}'></div><button href='#' onclick='deleteMe(this);' style='float:right; margin-right:10px;' data-uid='${thisData.id}'>X</button><button href='#' onclick='editMe(this);' style='float:right; margin-right:10px;' >Edit</button><h1>${thisDBnote.title}</h1><div>Note Created:</div><h5>${thisDBnote.timeStamp}</h5><p>${thisDBnote.body}</p></div><hr>`;
      let makeDBnote = document.createElement('article');
      makeDBnote.innerHTML = dbhtmlstring;
      element.appendChild(makeDBnote);
    }
  });
}

function editMe(thisthis){
    // define the html string, its delicate, needs to be adjusted if more html nodes are added
    let dataId = thisthis.parentNode.children[1].getAttribute('data-uid');
    let editString = `<div><h1><input type='text' placeholder='Oops! You forgot a title!' value='${thisthis.parentNode.children[3].innerText}'></h1><input type='text' placeholder='No Content!' value='${thisthis.parentNode.children[6].innerText}'><button style='float:right; margin-right:10px;' onclick='loadNotes()'>Cancel</button><button href='' onclick='saveChanges(this)' style='float:right; margin-right:10px;' data-uid='${dataId}' data-time='${thisthis.parentNode.children[5].innerText}'>Save</button></div><hr>`;
  // find the parent replace the parent with an html string.
    thisthis.parentNode.innerHTML = editString;
}

// Finds a particular Object's index by a given property. Super useful, i think ES6 has a way to make it a little cleaner with a newer version of a for loop
function findWithAttr(array, attr, value) {
  for(var i = 0; i < array.length; i += 1) {
    if(array[i][attr] == value) {
      return i;
    }
  }
  return -1;
}

// Saves the changes made from the editMe function to the original object and reloads notes.
function saveChanges(thisHere){
  // This is a bit delicate, will need to be adjusted if new html nodes are added above.
  let newBody = thisHere.parentNode.children[1].value,
    newTitle = thisHere.parentNode.children[0].children[0].value,
    noteId = thisHere.getAttribute("data-uid");
    sameTime = thisHere.getAttribute('data-time');
  console.log(noteId);
  notesDb.doc(noteId).set({
    title: newTitle,
    body: newBody,
    timeStamp: sameTime
  })
  .then(function() {
      console.log("Document successfully written!");
  })
  .catch(function(error) {
      console.error("Error writing document: ", error);
  });
  loadNotes();
  //titleList();
  // Set the .title and .body properties of the particular note object to the new input's values.
};
// Deletes a specific note from the database, then reloads the feilds.
function deleteMe(thisthis){
  var thisUid = thisthis.getAttribute("data-uid");
  notesDb.doc(thisUid).delete();
  loadNotes();
  //titleList();
};

//Adds an h2 with the title of the new note upon creation.
// fix this for firebase
/*
function titleList(){
  notesDb.get().then((notesSnapshot) => {
    list.innerHTML = "<h1>List of Notes</h1>";
    listCollection = notesSnapshot;
    listCollection.forEach((thisData) => {
      if (thisData && thisData.exists) {
        let noted = thisData.data();
        let listContent = `<h2>${noted.title}</h2>`;
        let listDiv= document.createElement('div');
        listDiv.innerHTML = listContent;
        list.appendChild(listDiv);
      }
    });
  });
}
*/

//The below function is called each submit button press to create an object with a title, timestamp and body, these are added to an array then set in localstorage
function submitNotes(){
  let noteObject = {};
  noteObject.type = document.getElementById('noteTypeInput').value;
  noteObject.body = document.getElementById('bodyInput').value;
  noteObject.title = document.getElementById('titleInput').value;
  noteObject.timeStamp = '\n' + Date();
  db.collection("notes").add(noteObject);
  loadNotes();
  //titleList();
};

// Below localStorage is cleared, as well as the array of note objects and the output html element.
function deleteNotes(){
  localStorage.clear("notesArray");
  element.innerHTML = "";
  //list.innerHTML = "<h1>List of Notes</h1>";
  let deleteAll = db.collection('notes');
  deleteAll.get().then(function(querySnapshot) {
    // find more efficient method
    querySnapshot.forEach(function(doc) {
      doc.ref.delete();
    });
  });
};
