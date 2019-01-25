//let submitNotes = () => getElementById('titleInput').value;
let title = "",
    body = "",
    timeStamp = "",
    bodyNote = document.getElementById('notedBody'),
    notedDate = document.getElementById('notedDate'),
    titleNote = document.getElementById('notedTitle');

//The below function is called each submit button press to generate a new note.
function submitNotes(){
  body = document.getElementById('bodyInput').value,
  title = document.getElementById('titleInput').value,
  timeStamp = '\n' + Date();

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
  let element = document.getElementById("testNote");
// Adds the new filled elements as children of the testNote element
  element.appendChild(testTitle);
  element.appendChild(subHeading);
  element.appendChild(testBody);
  element.appendChild(line);

}
//console.log(sumbitNotes);
