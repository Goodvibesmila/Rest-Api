
// Variabel som hämtar express "lägger express i en låda".
const express = require("express");

// Kan jag skriva såhär för att hämta data från min json-fil?
//const data = require('./cars.json');

//vanligt att döpa variabeln till app. För att Köra expressfunktionen/paketet.
const app = express();

const fs = require('fs');
//const { findSourceMap } = require("module");
//const { userInfo } = require("os");

// use = använd på alla. Kan använda json ist för send.
//För att skicka med all jsondata med expressmetod.
app.use(express.json())

// Den hämtar det som finns på databasen som servern innehåller.
// På den URL:en som vi väljer. När man surfar till den URL:en 
// Ska följande hämtas - Det vi väljer, i detta fallet det som
// finns i vår JSONfil (asså databasinnehållet)

// '/api' Bestämmer var URL:en ska heta/vad man ska surfa in på.
//Har lagt till cars.
// Följt av en anonym callbackfunktion - Vill vanligtvis
// Skicka in två saker/parameter i callbackfunktionen. Request, och response.
// Kan döpas till vad som, men man brukar skriva req och res.
// HTTP-respons-statuskoder. Alltså koder som talar om ngt. 200 är "det här har hänt, det här är okej"
// 201 är till exempel created.
// .send betyder = För att vi skall skicka tillbaka
//Det som är i fnuttarna, ELLER den datan vi har i JSONfilen - skall skickas tillbaka till servern.
//res.status är för att skapa respons.statuskoderna.

//Endpoint som hämtar alla produkter.
//kan jag skriva .json(data) för att jag hämtar datan genom min cars.json 
// i variablen data däruppe?

app.get('/api/cars', (req, res) => {
    fs.readFile("./cars.json", (err, data) => {
        if(err) {
            res.status(404).send("Oops, something went wrong")}
        
            const cars = JSON.parse(data);
            res.status(200).send(cars)
            return;
        })
});


// 201 betyder created.
//Kan ha samma URL Till post som jag har på Get. För varje anropsmetod.
// post = lägga till data.

app.post('/api/cars', (req, res) => {
    fs.readFile("./cars.json", (err, data) => {
        if(err) {
            res.status(404).send("Oops, something went wrong")}
        
            const cars = JSON.parse(data)
            const postcars = {
                Modell: req.body.Modell,
                Id: cars.length +1,
                color: req.body.color,
                price: req.body.price
            }
            cars.push(postcars);

            fs.writeFile("cars.json", JSON.stringify(cars, null, 2), (err) => {
                if (err) {
                    res.status(404).send("No car was added")
                }
                res.status(201).send(cars);
            })
        })
})

//Put uppdaterar data/ byter ut data.
app.put('/api/cars/:id', (req, res) => {
    fs.readFile("./cars.json", (err, data) => {
        const cars = JSON.parse(data)
        const car = cars.find((car) => car.id == req.params.id);
        if (!car) {
            res.status(404).send("The car does not exist");

        } else{
            cars.find((car) => {
                if(car.id == req.params.id) {
                car.Modell = req.body.Modell,
                car.color = req.body.color,
                car.price = req.body.price
                }
            });

            fs.writeFile("./cars.json", JSON.stringify(cars, null, 2), () => {
                res.status(202).send(cars);
            })
        }       
    })
});

//Delete för att ta bort data.
app.delete('/api/cars', (req, res) => {
    fs.readFile("./cars.json", (err, data) =>
    
    )
})

//Skapar ett fetchpromise. Kopplar därför ihop med.then
//Fetch renderar ett svar.
//Metod json för att kunna hämta data.
// sen .then för att hämta ut datan.
/*fetch('http://localstorage:3000/api/cars', {
    method: 'post',
    headers:{
        'Content-Type': 'application/json'
    }
    body: JSON.stringify({
        Name: 'user 1'
    })
})
.then(res => {
    if (res.ok) {
console.log('success')
    } else {
        console.log('not successfull')
    }
        res =>.json()
})
.then(data => console.log(data))*/

//Såhär tror jag att man skriver GET i VG uppgiften
//Hämtar en av mina cars/resurser.
/*app.get('api/cars/:id', (req, res) => {
    req.params.id
})*/

//Bestämmer vilken port vi vill köra den på.Nu kör vi port 3000.
// När man kör med databaser kommer vi använda något mer dynamiskt.

//Callbackfunktion efter porten. Innehåller strängen Servern är igång.
app.listen(3000, () => console.log("server is active"));


//fetch('http://localhos:3000/api/cars')
// ----------------------------------------------------------
// Ovanstående drar igång en express server och skapar endpoints. 


//app.delete('/api/cars');

//app.put('/api/cars');