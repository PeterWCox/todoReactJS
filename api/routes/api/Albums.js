const express = require('express');
const uuid = require('uuid');
const router = express.Router();


const idFilter = req => album => album.id === req.params.id;

let albums = require('../../data/albums.json');

// Gets All Albums
router.get('/', (req, res) => {

  if (albums !== null || albums.length == 0) {
    res.json(albums);
  }
  else{
    res.status(400).json({ msg: `No albums could be found` });
  }
});

// Get Album by Id
router.get('/:id', (req, res) => {

  //Verify there is an album that matches id
  const found = albums.some(idFilter(req));
  
  if (found) {
    res.json(albums.filter(idFilter(req)));
  } else {
    res.status(400).json({ msg: `No album with the id of ${req.params.id}` });
  }

});

/*Create Album*/
router.post('/', (req, res) => {

  //Create a new member using the body in the JSON 
  const newAlbum = {
    id: uuid.v4(),
    ...req.body,
  };

  //Validate request JSON
  let properties = ["artistName", "albumName", "songs"];
  let missingProperties = [];

  properties.map(property => {
    if (newAlbum[property] == null) {
      missingProperties.push(property);
    }
  });

  console.log(`${missingProperties}`)


  if (missingProperties.length == 0) {
    albums.push(newAlbum);
    res.json(albums);  
  }
  else{
    const missingPropertyString = properties.join(",");
    return res.status(400).json({ msg: `Please include the following missing properties: ${missingPropertyString}` });
  }
});

/*Update Album*/
router.put('/:id', (req, res) => {

  //Verify there is an album that matches id
  const found = albums.some(idFilter(req));

  if (found) {
    albums.forEach((album, i) => {
      if (idFilter(req)(album)) {

        const updatedAlbum = {...album, ...req.body};
        albums[i] = updatedAlbum
        res.json({ msg: 'Album updated', updatedAlbum });
      }
    });
  } else {
    res.status(400).json({ msg: `No album with the id of ${req.params.id}` });
  }
});

/*Delete Album*/
router.delete('/:id', (req, res) => {

   //Verify there is an album that matches id
  const found = albums.some(idFilter(req));

  if (found) {

    albums = albums.filter(album => !idFilter(req)(album))

    res.json({
      msg: 'Album deleted',
      albums: albums.filter(album => !idFilter(req)(album))
    });
  } else {
    res.status(400).json({ msg: `No album with the id of ${req.params.id}` });
  }
});

module.exports = router;
