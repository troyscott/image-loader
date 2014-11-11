
var connect = require('connect'),
    path = require('path'),
    // route = require('./routes'),
    hdlbars = require('express3-handlebars'),
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    methodOverride = require('method-override'),
    cookieParser = require('cookie-parser'),
    errorHandler = require('errorhandler'),
    express = require('express');


module.exports = function(app){
    // configuration code

    app.engine('handlebars', hdlbars.create({
        defaultLayout: 'main',
        layoutsDir: app.get('views') + '/layouts',
        partialsDir: [app.get('views') + 'partials']
    }).engine);
    app.set('view engine', 'handlebars');
    app.use(logger('dev'));
    app.use(bodyParser({
        uploadDir: path.join(__dirname, '../public/upload/temp')
    }));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded( {
        extended: true   
        
    }  
    ));
    app.use(methodOverride());
    app.use(cookieParser('some-secret-value-here'));
    app.use(app.router);
    app.use('/public/', express.static(path.join(__dirname, '../public')));

    if ('development' == app.get('env')) {
        app.use(errorHandler());

    }

    return app;

};

