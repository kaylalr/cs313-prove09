const express = require('express');
const app = express();
const url = require('url');
const PORT = process.env.PORT || 5000

// tell express where your views are going to be
app.set("views", "views");
// telling express you are using ejs
app.set("view engine", "ejs");


app.get("/", function (req, res) {
    res.render("main-form.ejs");
});
app.get("/get-cost", function (req, res) {
    let inputs = url.parse(req.url, true);
    let weight = inputs.query.weight;
    let type = inputs.query.type;
    let rate = calculateRate(weight, type);

    console.log("weight: " + weight + ", type: " + type + ", rate: " + rate);
    const params = {
        weight: weight,
        type: type,
        rate: rate
    }
    res.render("display-cost.ejs", params);
});

app.listen(PORT, function () {
    console.log("Server listening...");
});

function calculateRate(weight, type) {
    let rate;
    weight = +weight;
    switch (type) {
        case "letterStamped":
            if (weight <= 1) {
                rate = 0.55;
            } else if (weight <= 2) {
                rate = 0.7;
            } else if (weight < +3) {
                rate = 0.85;
            } else {
                rate = 1;
            }
            break;
        case "letterMetered":
            if (weight <= 1) {
                rate = 0.50;
            } else if (weight <= 2) {
                rate = 0.65;
            } else if (weight < +3) {
                rate = 0.80;
            } else {
                rate = 0.95;
            }
            break;
        case "largeEnvelope":
            switch (weight) {
                case "1":
                    rate = 1
                    break;
                case "2":
                    rate = 1.15
                    break;
                case "3":
                    rate = 1.3
                    break;
                case "4":
                    rate = 1.45
                    break;
                case "5":
                    rate = 1.6
                    break;
                case "6":
                    rate = 1.75
                    break;
                case "7":
                    rate = 1.9
                    break;
                case "8":
                    rate = 2.05
                    break;
                case "9":
                    rate = 2.20
                    break;
                case "10":
                    rate = 2.35
                    break;
                case "11":
                    rate = 2.5
                    break;
                case "12":
                    rate = 2.65
                    break;
                case "13":
                    rate = 2.8
                    break;
            }
            break;
        case "retail":
            if (weight <= 4) {
                rate = 3.66;
            } else if (weight <= 8) {
                rate = 4.39;
            } else if (weight <= 12) {
                rate = 5.19;
            } else {
                rate = 5.71;
            }
            break;
    }
    return rate;
}