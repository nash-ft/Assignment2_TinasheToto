const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;


// Routes
app.get('/', (req, res) => {
    res.send(`
        <h1>Hello, World!</h1>
        <a href="/about?color=blue">About (Blue)</a><br>
        <a href="/about?color=orange">About (Orange)</a><br>
        <a href="/cat/1">Cat 1</a><br>
        <a href="/cat/2">Cat 2</a><br>
        <a href="/cat/3">Cat 3?</a><br>
        <a href="/dne">Broken Link (goes to 404 page)</a>`);
});

app.get('/about', (req,res) => {
    var color = req.query.color;

    res.send("<h1 style='color:"+color+";'>Patrick Guichon</h1>");
});

app.get('/cat/:id', (req,res) => {

    var cat = req.params.id;

    if (cat == 1) {
        res.send("Fluffy: <img src='/fluffy.gif' style='width:250px;'>");
    }
    else if (cat == 2) {
        res.send("Socks: <img src='/socks.gif' style='width:250px;'>");
    }
    else {
        res.send("Invalid cat id: "+cat);
    }
});

app.use(express.static(__dirname + "/public"));

app.use((req,res) => {
	res.status(404);
	res.send("Page not found - 404");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});