define(function(require) {

    function IssueCollection() {
        this.url = "http://muddy-grass-1025.getsandbox.com/issues";
        this.collection = [];
        this.fullCollection = [];

        EventDispatcher.prototype.apply(IssueCollection.prototype);

    }

    IssueCollection.prototype = {
        fetch: function() {
            var request = $.ajax({
                url: this.url,
                method: 'GET',
                dataType: 'json'
            });

            request.done((function(data) {
                this.fullCollection = data;
                this.collection = this.fullCollection;
            }).bind(this));

            request.fail((function(error) {
                console.log('error' + error)
            }).bind(this));

            return request;
        },

        get: function() {
            return this.collection;
        },

        filter: function(properties) {

            this.collection = this.fullCollection;

            if(properties['description']) {
                this.collection = _.filter(this.collection, function(item) {
                    return item.description.toLowerCase().indexOf(properties['description'].toLowerCase()) !== -1;
                })

                delete properties['description'];
            }
            this.collection =  _.where(this.collection, properties);

            this.dispatchEvent({ type: 'filter', message: properties});
        },

        getListOf: function(attribute) {
            return _.compact(_.unique(_.pluck(this.fullCollection, attribute)));
        }

    };


    return IssueCollection;
});