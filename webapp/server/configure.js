
var path = require('path'),
    routes = require('./routes'),
    hdlbars = require('express3-handlebars'),
    moment = require('moment');

// connect 
    connect = require('connect'),    
    express = require('express');

module.exports = function(app){
    // configuration code

    // HTML Template system: Handlebars

    app.engine('handlebars', hdlbars.create({
        defaultLayout: 'main',
        layoutsDir: app.get('views') + '/layouts',
        partialsDir: [app.get('views') + '/partials'],
        helpers: {
            timeago: function(timestamp) {
                return moment(timestamp).startOf('minute').fromNow();
            }
        }
    }).engine);
    app.set('view engine', 'handlebars');


    // connect middleware
    app.use(connect.logger('dev'));
    app.use(connect.bodyParser({
        uploadDir:path.join(__dirname, '../public/upload/temp')
    }));
    app.use(connect.json());
    app.use(connect.urlencoded());
    app.use(connect.methodOverride());
    app.use(connect.cookieParser('some-secret-value-here'));
 
    app.use(app.router);
    app.use('/public/', express.static(path.join(__dirname, '../public')));

    if ('development' == app.get('env')) {
        app.use(connect.errorHandler());

    }
    routes.initialize(app);
    return app;

};

