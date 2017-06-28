'use strict'
const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

const petSchema = new Schema({
	Id    : Number,
	Name  : String,
	Age   : Number,
	Photo : String,
});

const Pet       = mongoose.model('Pet', petSchema);

module.exports  = Pet;