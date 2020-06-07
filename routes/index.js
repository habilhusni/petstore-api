const express     = require('express'),
      router      = express.Router(),
      petControl  = require('../controllers/petController'),
      userControl = require('../controllers/userController'),
      auth        = require('../autentikasi/auth');

// GET '/' /*home page*/ from url
router.get('/', (req, res) => {
  res.render('index', { title: 'Pet API' });
});

// POST '/signup' /*signup user*/ from url
router.post('/signup', userControl.signUp);

// POST '/login' /*login user*/ from url
router.post('/login', userControl.login);

// POST '/pet' /*create a pet*/ from url
router.post('/pet', auth.loginAuth, petControl.createPet);

// GET '/pet' /*show all pets*/ from url
router.get('/pet', auth.loginAuth, petControl.getAllPet);

// GET '/pet/:pet_id' /*show one pet*/ from url
router.get('/pet/:pet_id', auth.loginAuth, petControl.getOnePet);

// PUT '/pet/:pet_id' /*update a pet*/ from url
router.put('/pet/:pet_id', auth.loginAuth, petControl.updatePet);

// DELETE '/pet/:pet_id' /*delete a pet*/ from url
router.delete('/pet/:pet_id', auth.loginAuth, petControl.deletePet);

// POST '/pet/:pet_id/uploadImage' /*update photo*/ from url
router.post('/pet/:pet_id/uploadImage', auth.loginAuth, petControl.updatePhoto);


module.exports = router;