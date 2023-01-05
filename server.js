const express = require("express");
const cors = require("cors");
const app = express();
const fs = require('fs');
app.use(cors())
app.use(express.json())



app.get('/api/cars', (req, res) => {
    fs.readFile("./cars.json", (err, data) => {
        if(err) {
            res.status(404).send("Oops, something went wrong")}
        
            const cars = JSON.parse(data);
            res.status(200).send(cars)
            return;
        })
});


app.get('/api/cars/:Id', (req, res) => {
    fs.readFile("cars.json", (err, data) => {
        if(err) {
            res.status(404).send("No ID found")
        }
        const cars = JSON.parse(data)
        const car = cars.find((car) => car.id == req.params.id);
        res.status(200).send(car)
    })
})


app.post('/api/cars', (req, res) => {
    fs.readFile("./cars.json", (err, data) => {
        if(err) {
            res.status(404).send("Oops, something went wrong")}
        
            const cars = JSON.parse(data)
            let allcars = [];
            for(let i = 0; i < cars.length; i++) {
                allcars.push(cars[i].Id);
            }
            
            let highestid = (Math.max(...allcars));
        
            const postcars = {
                Modell: req.body.Modell,
                Id: highestid +1,
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


app.put('/api/cars/:Id', (req, res) => {
    fs.readFile("./cars.json", (err, data) => {
        const cars = JSON.parse(data)
        const car = cars.find((car) => car.Id == req.params.Id);
        if (!car) {
            res.status(404).send("Oh, No! Error!");

        } else{
            cars.find((car) => {
                if(car.Id == req.params.Id) {
                car.Modell = req.body.Modell,
                car.color = req.body.color,
                car.price = req.body.price
                }
            });

            fs.writeFile("./cars.json", JSON.stringify(cars, null, 2), () => {
                res.status(202).send("A new car was updated");
            })
        }       
    })
});



app.delete('/api/cars/:Id', (req, res) => {
    fs.readFile("cars.json", (err, data) => {
    if(err) {
        res.status(404).send("Oops, something went wrong")
    }else{
        const cars = JSON.parse(data);
        const carId = cars.find((car) => car.Id == req.params.Id);
        const index = cars.indexOf(carId);

        if(index >= 0) {
            cars.splice(index, 1)
        }else {
            res.status(404).send("Could not find car.")
        }

        fs.writeFile("cars.json", JSON.stringify(cars, null, 2), (err) => {
            if(err) {
                req.status(404).send("ooppps")
            }
            res.status(200).send(cars)
        })
    }
    })
})



app.listen(3000, () => console.log("server is active"));
