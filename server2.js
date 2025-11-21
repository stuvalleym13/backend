// const fs = require('node:fs');

import fs from 'node:fs';

fs.readFile('./notepad.txt', 'utf8', (err, data) => {

    if (err) {
        console.log("Errorgkfdjgl;df:", err);

        return;
    }
    console.log(data);
    console.log(typeof (data))

    const jsonData = JSON.parse(data);
    console.log(jsonData);
    console.log(jsonData.lastName);
});

const content = 'Some content!';

const user = 
[
    {
        "firstName": "Akhilesh",
        "lastName": "Kumar",
        "age":"32"
    },
    {
        "firstName": "John",
        "lastName": "Doe",
          "age":"34"
    },
    {
        "firstName": "Jane",
        "lastName": "Smith",
          "age":"22"
    }
]

const user1 = user[0];
const user2 = user[1];
const user3 = user[2];

const userString= JSON.stringify(user2);
const fileName = `./notepad_${user2.firstName}_${user2.lastName}.txt`

fs.writeFile(fileName, userString, err => {
    if (err) {
        console.error(err);
    } else {
        console.log('File written successfully!');
    }
})