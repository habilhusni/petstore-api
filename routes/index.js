'use strict'
const express = require('express');
const router  = express.Router();
const petControl = require('../controllers/petController');

router.get('/', function(req, res) {
	res.render('index', { title: 'Husni Habil' });
});

router.get('/pet', petControl.getAllPet);

router.post('/pet', petControl.createPet);

router.get('/pet/:pet_id', petControl.getOnePet);

router.put('/pet/:pet_id', petControl.updatePet);

router.delete('/pet/:pet_id', petControl.deletePet);


module.exports = router;