const express = require('express');
const path = require('path');
const fs =require('fs');
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Contact');
}


const app = express();
const port = 8080;

const contactschema = new mongoose.Schema({
    name : String,
    EmailId : String,
    ContactNo : Number,
    Address : String,
});

const Contact = new mongoose.model('Contact',contactschema);

//express stuff//
app.use('/static',express.static('static'));
app.use(express.urlencoded());

//pug specific Content//
app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

//endpoints//
app.get('/',(req,res)=>{
    res.status(200).render('home.pug');
})
app.get('/contact',(req,res)=>{
    res.status(200).render('contact.pug');
})

app.post('/contact',(req,res)=>{
    var mydata = new Contact(req.body)

    mydata.save().then(()=>{
        res.send("Response Added :)")
    }).catch(()=>{
        res.status(400).send("Error Occured")
    });
})

//starting the server///
app.listen(port,()=>{
    console.log(`The application is successfully run on port:${port}`);
})