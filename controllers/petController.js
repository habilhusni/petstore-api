'use strict'
const Pet  = require('../models/pet');

let getAllPet = (req, res) => {
	Pet.find(function (err, data) {
		if(err) res.send(err);
		res.send(data);
	});
}

let getOnePet = (req, res) => {
	Pet
	.findOne({Id: req.params.pet_id})
	.exec((err, data) => {
		if(err) res.send(err);
		res.send(data);
	});
}

let createPet = (req, res) => {
	let pet = new Pet(
		{
			Id: req.body.Id,
			Name: req.body.Name,
			Age: req.body.Age,
			Photo: req.body.Photo,
		});
	pet.save((err, data) => {
		if(err) {
			res.status(400).send(err);
		}else {
			res.send(data);
		}
	})
}

let updatePet = (req, res) => {
	Pet.findOne({
		Id: req.params.pet_id
	}, (err, data) => {
		if(err) {
			res.send(err);
		}else {
			data.Id 	 = req.body.Id,
			data.Name  = req.body.Name,
			data.Age 	 = req.body.Age,
			data.Photo = req.body.Photo;
			data.save((err, response) => {
				if(err) {
					res.status(400).send(err);
				}else {
					res.send(response);
				}
			});
		}
	});
}

let deletePet = (req, res) => {
	Pet.findOneAndRemove({
		Id: req.params.pet_id
	}, (err, data) => {
		if(err) {
			res.status(400).send(err)
		}else if(!data) {
			res.status(400).send(err)
		}else {
			res.send(data);
		}
	})
}

module.exports = {
	getAllPet,
	getOnePet,
	createPet,
	updatePet,
	deletePet,
}