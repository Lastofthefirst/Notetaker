//let submitNotes = () => getElementById('titleInput').value;
let title = "",
    body = "",
    timeStamp = "",
    bodyNote = document.getElementById('notedBody'),
    notedDate = document.getElementById('notedDate'),
    titleNote = document.getElementById('notedTitle');


function submitNotes(){
  body += '\n' + document.getElementById('bodyInput').value,
  title += '\n' + document.getElementById('titleInput').value,
  timeStamp += '\n' + Date();

  titleNote.innerText = title;
  notedDate.innerText = timeStamp;
  bodyNote.innerText = body;
}
//console.log(sumbitNotes);
