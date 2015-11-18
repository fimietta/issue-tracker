/* global beforeEach, describe, it, expect, sinon */

'use strict';

var IssueTrackerAPI = require('../../api/IssueTrackerAPI');

describe('IssueTrackerAPI', function() {

    var issuetrackerAPI,
        request,
        response,
        app,
        issueJSON;

    before(function() {
        request = {};
        response = {
            status: sinon.spy(),
            json: sinon.spy()
        };

        app = {
            get: sinon.spy()
        }

        issueJSON = [{ content: 'foo'}];
    });

    beforeEach(function() {

        issuetrackerAPI = new IssueTrackerAPI(issueJSON);
    });

    it('should attach endpoints', function() {
        // Act
        issuetrackerAPI.install(app);

        // Assert
        expect(app.get).has.been.calledWith('/api/issues');
    });

    it('should respond with the iusses\'s list', function() {
        // Act
        issuetrackerAPI.getAll(request, response);

        // Assert
        expect(response.status).to.have.been.calledWith(200);
        expect(response.json).to.have.been.calledWith(issueJSON);

    });




});
