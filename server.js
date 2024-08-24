const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors({
    origin: '*'
}));
app.use(express.json());

let commandLed = 'off';

app.post('/api/arduino-control', (req, res) => {
    commandLed = req.body.command;
    console.log(commandLed);
    res.send(`Command received: ${commandLed}`);
});

app.get('/api/arduino-control', (req, res) => {
    res.json({ commandLed });
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})