let express = require('express');

module.exports = (app) => {

    /* Other configurations */
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));
};



