const express = require('express');
const router = express.Router();
const Bookmarks = require('../models/bookmarks');

router.post('/', (req, res) => {
  console.log(req.body.title);
  console.log(req.body.url);
  let matchedItem = false;
  Bookmarks.find({}, (err, foundBookmarks) => {
    console.log("line10")
    if (foundBookmarks){
      console.log("line12");
      bookmarks = foundBookmarks;
      for(let i = 0; i < bookmarks.length; i += 1) {
        console.log(bookmarks[i]);
        if(req.body.title === bookmarks[i].title){
          console.log("line16");
          matchedItem = true;
          Bookmarks.findOneAndUpdate({ title: bookmarks[i].title, url: bookmarks[i].url }, { title: bookmarks[i].title, url: req.body.url }, { upsert: true }, (error, updatedBookmark) => {
            console.log(error, "line20");
            console.log(updatedBookmark)
            updatedBookmark = updatedBookmark.toJSON();
            updatedBookmark.return = "put";
            res.json(updatedBookmark);
          });
        }
      }
    } 
      console.log("line26")
      console.log(bookmarks)
    if(!matchedItem){
      console.log("line28")
        Bookmarks.create(req.body, (err, createdBookmark) => {
        createdBookmark = createdBookmark.toJSON();
        createdBookmark.return = "post";
        res.json(createdBookmark)
      });
    } 
  });
});

router.get('/', (req, res) => {
  Bookmarks.find({}, (err, foundBookmarks) => {
    res.json(foundBookmarks)
  });
});

router.post('/delete', (req, res) => {
  Bookmarks.findOneAndRemove({ title: req.body.item}, (error, deletedBookmarks) => {
      res.json(deletedBookmarks);
  });
});

router.put('/:id', (req, res) => {
  Bookmarks.findByIdAndUpdate(req.params.id, req.body, {new:true}, (error, updatedBookmark) => {
      res.json(updatedBookmark);
  })
});

module.exports = router;