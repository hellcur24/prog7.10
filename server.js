const express = require('express');
const ejs = require('ejs');
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser');
let countryNameArr;

app.use(bodyParser.urlencoded({extended:true}));


app.use(express.static('public'));//мы разрешаем испльзовать эту папку, или не будет работать
app.set('view engine', ejs);

app.get('/', (req,res)=>{   
    let urlName =`https://restcountries.eu/rest/v2/`;
      axios.get(urlName)
    .then(function(response){
        countryNameArr = response.data;
        countryNameArr.forEach(countryNameArr => {

        });
        res.render("index.ejs", {countryObject:'',
            countryArr: countryNameArr});
          
    })
    .catch(function(error){
        console.log(error);
    });
    //----------------------------
    
});

app.post('/',(req, res) =>{
    let country = req.body.country;

    let url = `https://restcountries.eu/rest/v2/name/${country}?fullText=true`;
    //----------------------

    
    
    //----------------------
    axios.get(url)
    .then(function(response){
        let countryObject = response.data[0];
          console.log(countryObject.name);
          res.render("index.ejs", {countryObject: countryObject, countryArr: countryNameArr });
    })
    .catch(function(error){
        console.log(error);
    });
    
    //res.sendFile(__dirname+'/index.html');
});
app.listen(5000,()=>{
    console.log('Server is running on Port 5000.');
}); 