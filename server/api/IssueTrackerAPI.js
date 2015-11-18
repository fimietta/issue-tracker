'use strict';

var log = require('log4js-config').get('tokens.db');

class IssueTrackerAPI {

    constructor(issuesJSON) {
        this.issuesJSON = issuesJSON || require('../data/issues.json');

    }

    install(app) {
        app.get('/api/issues', this.getAll.bind(this));
    }

    healthcheck() {

    }

    getAll(request, response) {
        response.status(200);
        response.json(this.issuesJSON);

        log.debug('response successful with data ', this.issuesJSON);

    }

}

module.exports = IssueTrackerAPI;