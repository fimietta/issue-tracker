'use strict';

var http = require('http');
var VersionAPI = require('./admin/VersionAPI');
var Healthcheck = require('./admin/HealthcheckAPI');
var IssueTrackerAPI = require('./api/IssueTrackerAPI');

var log = require('log4js-config').get('app');

var swaggerUiMiddleware = require('swagger-ui-middleware');

class Service {

    constructor(configuration, versionAPI, healthcheckAPI, issuetrackerAPI) {
        this.configuration = configuration;
        this.versionAPI  = versionAPI || new VersionAPI();
        this.issuetrackerAPI = issuetrackerAPI || new IssueTrackerAPI();
        this.healthcheckAPI = healthcheckAPI || new Healthcheck(this.configuration);
    }

    start(app) {
        var cookieParser = require('cookie-parser');
        app.use(cookieParser());

        var bodyParser  = require('body-parser');
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());

        swaggerUiMiddleware.hostUI(app, {overrides: __dirname + '/../swagger-ui/'});

        this.versionAPI.install(app);
        this.healthcheckAPI.install(app);
        this.issuetrackerAPI.install(app);

        var port = this.configuration.port;
        var server = http.createServer(app);
        server.listen(port, function() {
            log.info('Service started on port', port);
        });

        return server;
    }
}

module.exports = Service;
