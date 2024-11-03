const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware to parse JSON data from the client
app.use(bodyParser.json());

// Route to handle form submission
app.post('/submit', (req, res) => {
    const { name, phone, email, discount } = req.body;

    // Prepare data in CSV format
    const csvRow = `${name || 'N/A'},${phone || 'N/A'},${email || 'N/A'},${discount || 'N/A'}%\n`;

    // Append the data to data.csv file
    fs.appendFile(path.join(__dirname, 'data.csv'), csvRow, (err) => {
        if (err) {
            console.error('Error writing to file', err);
            return res.status(500).send('Server Error');
        }
        res.send('Data successfully saved');
    });
});

// Serve static files for the frontend
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
