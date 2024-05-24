import express from 'express';

// const express = require('express');
const app = express(); 
const port = process.env.PORT || 5000;

require('./routes/index.js')(app);

app.listen(port, () => console.log(`Listening on port ${port}`));

