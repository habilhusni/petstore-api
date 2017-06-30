const express 		= require('express'),
			router 			= express.Router(),
			Pet  				= require('../models/pet'),
			Upload 			= require('upload-file');

/*
 * Show All Pets
 */
let getAllPet = (req, res) => {

			Pet.find( (err, pets) => {
				if(err) {
					res.status(400).send(err);	
				}else {
					// res.send(pets);
					res.render('showAllPets', {pets: pets});					
				}
			});

		},

/*
 * Show One Pet
 */
		getOnePet = (req, res) => {

			Pet
			.findOne({Id: req.params.pet_id})
			.exec((err, pet) => {
				if(err) {
					res.status(400).send(err);	
				}else if(!pet) {
					res.status(400).send('cannot find pet_id');
				}else {
					res.send(pet);
				}
			});

		},

/*
 * Create a Pet
 */
		createPet = (req, res) => {

			let pet = new Pet(
				{
					Id: req.body.Id,
					Name: req.body.Name,
					Age: req.body.Age,
					Photo: req.body.Photo,
				});

			pet.save((err, pet) => {
				if(err) {
					res.status(400).send(err);
				}else {
					// res.send(pet);
					res.redirect('/pet');
				}
			});

		},

/*
 * Update a Pet
 */
		updatePet = (req, res) => {

			Pet
			.findOne({Id: req.params.pet_id})
			.exec((err, pet) => {
				if(err) {
					res.status(400).send(err);
				}else if(!pet) {
					res.status(400).send('cannot find pet_id')
				}else {
					pet.Id 	  = req.body.Id;
					pet.Name  = req.body.Name;
					pet.Age 	= req.body.Age;
					pet.Photo = req.body.Photo;
					pet.save((err, response) => {
						if(err) {
							res.status(400).send(err);
						}else {
							res.send(response);
						}
					});
				}
			});

		},

/*
 * Delete a Pet
 */
		deletePet = (req, res) => {

			Pet
			.findOneAndRemove({Id: req.params.pet_id}) 
			.exec((err, pet) => {
				if(err) {
					res.status(400).send(err);
				}else if(!pet) {
					res.status(400).send('cannot find pet_id');
				}else {
					res.send(pet);
				}
			});

		},

/*
 * Update Photo by Uploading from Local File
 */
		updatePhoto = (req, res) => {

			var upload = new Upload({
				dest: 'public/photos',
				maxFileSize: 1000 * 1024,
				acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
			});
		 
			upload.on('end', (fields, files) => {
				var path 			= files.file.path,
						pathPhoto = path.replace('public/','');

				Pet
				.findOne({Id: req.params.pet_id})
				.exec((err, pet) => {
						if(err) {
							res.status(400).send(err);
						}else if(!pet) {
							res.status(400).send('cannot find pet_id');
						}else {
							pet.Photo = pathPhoto;
							pet.save((err, response) => {
								if(err) {
									res.status(400).send(err);
								}else {
									// res.send(response);
									res.redirect('/pet');
								}
							});
						}
					});

			});
		 
			upload.on('error', err => {
				res.status(400).send(err);
			});
		 
			upload.parse(req);

		};


module.exports = {
	getAllPet,
	getOnePet,
	createPet,
	updatePet,
	deletePet,
	updatePhoto,
}