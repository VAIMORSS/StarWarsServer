let got = require('got');
const express = require('express');
const app = express();

app.get('/',(req,res)=>{
    
    getData(url)
       .then((result)=>{
        temp=result.body.results;
        var actions=temp.map(otherInfo);
        var results = Promise.all(actions);
        
        results.then(data=>{
            console.log(data.length)
            data.forEach(element => {
                //console.log(element.body)
            });
        })
        console.log(result.body.results.length)
        res.send(result.body);
    })
})

const getData = url => {
    return got(url, { json: true })      
};
let url = `https://swapi.co/api/people/`;

let temp=[];
    

const otherInfo = obj =>{
    let tempHomeWorld;
    let tempFilms;
    let tempSpices;
    console.log(obj.homeworld)
    return new Promise(resolve=> resolve(getData(obj.homeworld)));
}


const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));