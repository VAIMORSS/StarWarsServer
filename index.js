const express = require('express');
const app = express();
const axios = require('axios');
let got = require('got');

app.get('/:id', (req, res) => {
    let temp;

    let url = `https://swapi.co/api/people/${req.params.id}`;

    getData(url)
        .then(function (response) {
            temp = response.body;

            getData(temp.homeworld)
                .then((r_tempHomeWorld) => {
                    temp.homeworld = r_tempHomeWorld.body;

                    getData(temp.species[0])
                        .then((r_tempSpices) => {

                            temp.species = r_tempSpices.body;
                           

                        }).then(()=>{
                            let tempFilms = [];

                            //maping promises with every film fetch
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

    // getPersonByUrl(url).then((result)=>{
    //     console.log(result)
    //     res.send(result);
    // })


});

//making promise to fetch data from the API
const getData = url => {
    return got(url, { json: true })      
};

//making promise function to map all films 
const filmGetter =  film => {
    return new Promise(resolve=> resolve(getData(film)));
}


const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));

