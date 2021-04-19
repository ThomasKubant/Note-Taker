const fs = require('fs');
const path = require('path');

function saveNote(text, db) {
    const noteText = text;
    db.push(noteText);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes: db }, null ,2)
   );
   return noteText;
};
function validateNote(note) {
    if(!note.title) {
        return false;
   }
   if(!note.text) {
        return false;
   }
   else {
       return true;
   }
};
function findById(id, array) {
   let result = array.filter(notes => notes.id === id)[0];
   return result;
}
function deleteNote(id, array) {
    let selectedNote = findById(id, array);
    let noteIndex = array.indexOf(selectedNote);
    newArray = array.splice(noteIndex, 1);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes: newArray }, null, 2)
    )
}
module.exports = {
    saveNote,
    validateNote,
    findById,
    deleteNote
    }