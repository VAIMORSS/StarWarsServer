const express = require('express');
const app = express();
const axios = require('axios');
let got = require('got');

app.get('/:id', (req, res) => {
    let temp;

    let url = `https://swapi.co/api/people/${req.params.id}`;

    got(url, { json: true })
        .then(function (response) {
            temp = response.body;

            got(temp.homeworld, { json: true })
                .then((r_tempHomeWorld) => {
                    temp.homeworld = r_tempHomeWorld.body;

                    got(temp.species[0], { json: true })
                        .then((r_tempSpices) => {

                            temp.species = r_tempSpices.body;
                            console.log(temp.species)
                           

                        }).then(()=>{
                            let tempFilms = [];
                            var actions=temp.films.map(filmGetter);
                            var results = Promise.all(actions);
                            results.then(data=>{
                                data.forEach(element => {
                                    tempFilms.push(element.body)
                                });  
                                temp.films=tempFilms;
                                res.send(temp)
                            })
                            
                        });
                });
        })
});

const getData = url => {
    return got(url, { json: true })      
};

const filmGetter =  film => {
    return new Promise(resolve=> resolve(getData(film)));
}


const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));

