// jshint esversion:6
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const apiKey = process.env.MY_API_KEY;
const listId = process.env.MY_LIST_ID;

console.log({apiKey : apiKey, listId : listId});

const app = express();

const PORT = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', (req,res) => {
    res.sendFile(__dirname + 'index.html');
});

app.post('/', (req,res) => {
    let fname = req.body.fname;
    let lname = req.body.lname;
    let email = req.body.email;

    let signupData = {
        members: [
            {
                email_address: email,
                status: 'subscribed',
                merge_fields : {
                    FNAME : fname,
                    LNAME : lname
                }
            }
        ]
    };

    mailChimpUrl = 'https://us6.api.mailchimp.com/3.0/lists/' + listId;

    signupData = JSON.stringify(signupData);

    auth = {
        username : 'Ayilara Sodiq',
        password : apiKey
    };

    axios.post(mailChimpUrl,signupData,{auth : auth})
    .then(response => {
        if(response.status == 200){
            res.sendFile(__dirname + '/public/success-signup.html');
        }
    })
    .catch(err => console.log(err.message));

});


app.listen(PORT, () => console.log('Server is running on port ' + PORT));