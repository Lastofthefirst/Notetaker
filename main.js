//let submitNotes = () => getElementById('titleInput').value;
let title = "",
    body = "",
    timeStamp = "",
    uid = "",
    element = document.getElementById("testNote");
    list = document.getElementById("notes_list");
    notesCollection = JSON.parse(localStorage.getItem("notesArray"));
    if (notesCollection==null) {
      notesCollection = [];
    };
    loadNotes();
    titleList();

// Below the array of note objects is iterated through adding html elements containing the properties of each note objects.
function loadNotes(){
  element.innerHTML = "";
  for (i = 0; i < notesCollection.length; i++){
    var htmlString = "<h1><a href='#' onclick='deleteMe(this);' style='float:right; margin-right:10px;' data-uid='"+notesCollection[i].uid+"'>X</a>"+notesCollection[i].title+"</h1><h5>"+notesCollection[i].timeStamp+"</h5><p>"+notesCollection[i].body+"</p><hr>";
    var noteDiv = document.createElement('article');
    noteDiv.innerHTML = htmlString;
    element.appendChild(noteDiv);
    if (notesCollection==null) {
      notesCollection = [];
    }
  }
};

function deleteMe(thisthis){
  thisthis.parentNode.parentNode.parentNode.removeChild(thisthis.parentNode.parentNode);
  var thisUid = thisthis.getAttribute("data-uid");
  notesCollection = notesCollection.filter(function( obj ) {
    return obj.uid !== thisUid;
  });
  let notesCollectionSerialized = JSON.stringify(notesCollection);
  localStorage.setItem("notesArray", notesCollectionSerialized);
  loadNotes();
  titleList();
  // 1. find parent, delete parent from DOM
  // 2. find object in array
  // 3. delete object from array
  // 4. save array to localstorage
  // 5. Reload notes & title list
  // loadNotes();
  // titleList();
};

function titleList(){
  list.innerHTML = "<h1>List of Notes</h1>";
  for (i = 0; i < notesCollection.length; i++){
    let listContent = "<h2>" + notesCollection[i].title+"<h2>";
    let listDiv = document.createElement('div');
    listDiv.innerHTML = listContent;
    list.appendChild(listDiv);
  }
}

function createUid() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
}
//The below function is called each submit button press to create an object with a title, timestamp and body, these are added to an array then set in localstorage
function submitNotes(){
  let noteObject = {};
  noteObject.body = document.getElementById('bodyInput').value;
  noteObject.title = document.getElementById('titleInput').value;
  noteObject.timeStamp = '\n' + Date();
  noteObject.uid = createUid();
  notesCollection.push(noteObject);
  let notesCollectionSerialized = JSON.stringify(notesCollection);
  localStorage.setItem("notesArray", notesCollectionSerialized);
  notesCollection = JSON.parse(localStorage.getItem("notesArray"));
  loadNotes();
  titleList();
};

// Below localStorage is cleared, as well as the array of note objects and the output html element.
function deleteNotes(){
  localStorage.clear("notesArray");
  notesCollection = [];
  element.innerHTML = "";
  titleList();
};




/*
//Creates the a variable to create an h1, and a variable for to fill the text with the title value
  let testTitle = document.createElement("h1");
  let titleContent = document.createTextNode(title);
  let subHeading = document.createElement("h5");
  let noteTime = document.createTextNode(timeStamp);
// Creates a variable to create a p and a variable of text filled with the body value.
  let testBody = document.createElement("p");
  let bodyContent = document.createTextNode(body);
  let line = document.createElement("hr");
// Fills the new elements with the text variables(which pull from user input)
  testTitle.appendChild(titleContent);
  testBody.appendChild(bodyContent);
  subHeading.appendChild(noteTime);
// Adds the new filled elements as children of the testNote element
  element.appendChild(testTitle);
  element.appendChild(subHeading);
  element.appendChild(testBody);
  element.appendChild(line);
*/
//console.log(sumbitNotes);
