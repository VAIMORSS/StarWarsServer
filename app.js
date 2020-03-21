const express = require('express');
const app = express();
const got = require('got');

app.get('/:id',async (req, res) => {
    const url = `https://swapi.co/api/people/${req.params.id}`;
    try{
         const character = await getData(url);
         const homeWorld = await getData(character.body.homeworld);
         const species = await getData(character.body.species[0]);
         const films = await getFilms(character.body.films);
         res.status(200).send({...character.body,homeworld:homeWorld.body,species:species.body,films:films})
    }catch(e){
        res.status(404).send({"error":"something went wrong"});
    }
});

//making promise to fetch data from the API
const getData = url => {
    return new Promise((resolve,reject)=>{
        try{
            resolve(got(url, { json: true }));     
        }catch(e){
           reject(e);
        }
    }) 
};


const getFilms = async (films)=>{
    const actions= await Promise.all(films.map(getData));
    return new Promise((resolve,reject)=>{
        try{
            let tempFilms = [];
            actions.forEach(element => {
                    tempFilms.push(element.body)
            });  
            resolve(tempFilms);     
        }catch(e){
           reject(e);
        }
    }) 
}


module.exports = app;