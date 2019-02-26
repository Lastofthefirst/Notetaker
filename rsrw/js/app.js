firebase.initializeApp({
  apiKey: ' AIzaSyAS0lySLr_Odki-Wk7lIn1DTKbJ2DCBQb4 ',
  authDomain: 'racestoryrewriteusers.firebaseapp.com',
  projectId: 'racestoryrewriteusers'
});
var db = firebase.firestore();
var notesDb = db.collection("notes");
var usersDb = db.collection("users");
var activitiesDb = db.collection("activities");
var userObj;
firebase.auth().onAuthStateChanged(function(user) {
  if(user) {
    userObj = user;
    $("#emailDisplay").text(user.email);
    $("#loginCard").hide();
    $("#logoutBtn").show();
    $("#newNoteCard").show();
    loadNotes();
    usersDb.doc(user.uid).get().then(function(userDoc) {
      userDoc = userDoc.data();
      userObj.first = userDoc.first;
      userObj.last = userDoc.last;
      userObj.locality = userDoc.locality;
      activitiesDb.where('locality', '==', userDoc.locality).orderBy("name", "asc").get().then(function(activitiesQuerySnapshot) {
        activitiesQuerySnapshot.forEach(function(activitiyDoc) {
          $("#activitySelect").append("<option>" + activitiyDoc.data().name + "</option>");
        });
      }).catch(function(error) {
        console.log("Error getting documents: ", error);
      });
    }).catch(function(error) {
      console.log("Error getting documents: ", error);
    });
  } else {
    $("#loginCard").show();
    $("#logoutBtn").hide();
    $("#newNoteCard").hide();
  }
});
function loadNotes() {
  notesDb.where('uid', '==', userObj.uid).orderBy("created", "desc").get().then(function(querySnapshot) {
    $("#notesList").html("");
    querySnapshot.forEach(function(doc) {
      var notesHtml = '<li><span class="previousNote">' +
        '<span class="mail-sender">' + doc.data().activity + '</span>' +
        '<span class="mail-subject">' + doc.data().created.toDate().toUTCString() + '</span>' +
        '<span class="mail-message-preview">' + doc.data().body + '</span>' +
        '</span></li>';
      $("#notesList").append(notesHtml);
    });
  }).catch(function(error) {
    console.log("Error getting documents: ", error);
  });
}
function saveNote() {
  notesDb.add({
      activity: $("#activitySelect").val(),
      body: $("#noteTextarea").val(),
      created: new Date(),
      locality: userObj.locality,
      uid: userObj.uid,
      userEmail: userObj.email,
      userName: userObj.first + " " + userObj.last
    })
    .then(function() {
      loadNotes();
      $('#newNoteCard').trigger("reset");
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });
}
function login() {
  firebase.auth().signInWithEmailAndPassword($("#inputEmail").val(), $("#inputPassword").val()).then(function() {
  }).catch(function(error) {
    console.log(error);
    var errorCode = error.code;
    var errorMessage = error.message;
  });
}
function logout() {
  firebase.auth().signOut().then(function() {
  }).catch(function(error) {
    console.log(error);
  });
}