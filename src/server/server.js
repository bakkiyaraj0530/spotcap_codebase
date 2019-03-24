const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 4000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
/*
* @API call to append the new rules data. 
*/
app.post('/updateRule', (req, res) => {
    const file = 'src/json/rules.json';
    var obj = {};
    var fs = require('fs');   // Invoking FS class to read and write the rule JSON file.

    fs.readFile(file, 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
        obj = JSON.parse(data);
        obj.push(req.body); 
        json = JSON.stringify(obj, null, "\t");
        fs.writeFile(file, json, 'utf8',  function(err) {
            if (err) throw err;
            console.log('-----------Rules data Appended succesfully-------');
            });
    }});
    res.send(
        `I received your POST request. This is what you sent me: ${req.body.ruleMatchType}`,
    );
});

app.listen(port, () => console.log(`Listening on port ${port}`));