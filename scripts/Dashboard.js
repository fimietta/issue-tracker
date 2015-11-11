define(function (require) {

    var IssueCollection = require('./IssueCollection');
    var IssueTracker = require('./IssueTracker');
    var FilterComponent = require('./FilterComponent');


    function Dashboard() {

        this.issueCollection = new IssueCollection();

        this.issueCollection.fetch().done(this.setupIssueTracker.bind(this));
    }

    Dashboard.prototype.setupIssueTracker = function() {

        this.filterComponent = new FilterComponent({
            collection: this.issueCollection
        });

        this.issueTracker = new IssueTracker({
            collection: this.issueCollection,
            filterComponent: this.filterComponent
        });

        this.issueTracker.render();


    }

    Dashboard.prototype.render = function() {

    };

    return Dashboard;

});


