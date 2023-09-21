const express = require('express');
const router = require('./routers/route.js');
const app = express();

const port = 3000;

app.use(express.json());

///routes

app.use('/api', router);

app.listen(port, () => {
    console.log('Server is listening on port 3000. Ready to accept requests!');
    });