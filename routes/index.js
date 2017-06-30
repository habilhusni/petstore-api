const express     = require('express'),
      router      = express.Router(),
      petControl  = require('../controllers/petController');

// GET '/' /*home page*/ from url
router.get('/', (req, res) => {
  res.render('index', { title: 'Pet API' });
});

// POST '/pet' /*create a pet*/ from url
router.post('/pet', petControl.createPet);

// GET '/pet' /*show all pets*/ from url
router.get('/pet', petControl.getAllPet);

// GET '/pet/:pet_id' /*show one pet*/ from url
router.get('/pet/:pet_id', petControl.getOnePet);

// PUT '/pet/:pet_id' /*update a pet*/ from url
router.put('/pet/:pet_id', petControl.updatePet);

// DELETE '/pet/:pet_id' /*delete a pet*/ from url
router.delete('/pet/:pet_id', petControl.deletePet);

// POST '/pet/:pet_id/uploadImage' /*update photo*/ from url
router.post('/pet/:pet_id/uploadImage', petControl.updatePhoto);


module.exports = router;