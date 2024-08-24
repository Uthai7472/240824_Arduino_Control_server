const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors({
    origin: '*'
}));
app.use(express.json());

let commandLed = 'off';
let lastArduinoValue = null;

// Control LED
app.post('/api/arduino-control', (req, res) => {
    commandLed = req.body.command;
    console.log(commandLed);
    res.send(`Command received: ${commandLed}`);
});

app.get('/api/arduino-control', (req, res) => {
    res.json({ commandLed });
});

// Monitor data from arduino controller
app.post('/api/arduino-data', (req, res) => {
    lastArduinoValue = req.body.randomValue;
    console.log(`Received random value: ${lastArduinoValue}`);
    res.send(`Random value received: ${lastArduinoValue}`);
});

app.get('/api/arduino-data', (req, res) => {
    res.json({ randomValue: lastArduinoValue });
})


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})