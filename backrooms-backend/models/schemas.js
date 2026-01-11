const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type:string},
    email: {type:string},
    website: {type:string},
    entryData: {type:Date, default:Date.now}
});

const contactSchema = new Schema({
    name: {type:string, required:true},
    email: {type:string, required:true},
    website: {type:string, required:true},
    entryData: {type:Date, default:Date.now}
});

const Users = mongoose.model('Users', userSchema, 'users');
const Contact = mongoose.model('Contact', contactSchema, 'contact_form');
const mySchemas = {'Users':Users, 'Contact':Contact};

module.exports = mySchemas;