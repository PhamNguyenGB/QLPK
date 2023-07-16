import express from 'express';
import path from 'path';
import expressLayouts from 'express-ejs-layouts';

let configViewEngine = (app) => {
    app.use(express.static('./src/public'));
    app.use(expressLayouts);
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, '../views'));
    app.set('layout', './layouts/main');

};

module.exports = configViewEngine;