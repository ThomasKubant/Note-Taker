const router = require('express').Router();
const shortid = require('shortid');
const { notes } = require('../../db/db.json');
const { saveNote, validateNote, findById, deleteNote } = require('../../lib/notes');
router.get('/notes', (req, res) => {
    let results = notes;
    res.json(results);
});
router.post('/notes', (req, res) => {
    req.body.id = shortid.generate();
    if(!validateNote(req.body)) {
        res.status(400).send("Notes need a name and body text.");
   } else {
        const note = saveNote(req.body, notes);
        res.json(note);
   }
})
router.post('/notes/:id', (req, res) => {
    const result = filterById(req.params.id, notes);
    if(result) {
        res.json(result);
    }
    else {
        res.send(404);
   }
})
router.delete('/notes/:id', (req, res) => {
    const result = deleteNote(req.params.id, notes);
    res.json(result);
})
module.exports = router;