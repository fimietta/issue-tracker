define(function(require) {

    function IssueTracker(options) {
        this.collection = options.collection;
        this.filterComponent = options.filterComponent;

        this.collection.addEventListener( 'filter', _.bind(function ( event ) {
            this.render();
        }, this));
    }

    IssueTracker.prototype = {

        addListener: function() {
            var self = this;

            $("span[data-category]").on('click', function() {
                var value = $(this).data('category');
                self.filterComponent.filterBy('category', value, true);
            });

            $("span[data-project]").on('click', function() {
                var value = $(this).data('project');
                self.filterComponent.filterBy('project', value, true);
            });


            $("span[data-assignee]").on('click', function() {
                var value = $(this).data('assignee');
                self.filterComponent.filterBy('assignee', value, true);
            });

            $("span[data-description]").on('click', function() {
                var value = $(this).data('description');
                self.filterComponent.filterBy('description', value, true);
            });
        },

        render: function() {
            var html = '<div class="row header visible-lg"><div class="col-lg-1">Id</div><div class="col-lg-3">Description</div><div class="col-lg-3">Category</div><div class="col-lg-3">Project</div><div class="col-lg-2">Assignee</div></div>';

            $("#issue-tracker-list").empty();

            _.each(this.collection.get(), function(model) {
                html += "<div class='row issue'>\n";

                html += "<div class='col-lg-1'>\n";
                html += "<span class='issue-label hidden-lg issue-id'>ID:</span>&nbsp;";
                html += "<span class='issue-id'>" + model.id + "</span>&nbsp;";
                html += "</div>\n";

                html += "<div class='col-lg-3'>\n";
                html += "<span class='issue-label hidden-lg'>DESCRIPTION:</span>&nbsp;";
                html += "<span class='issue-data' data-description='" +  model.description + "'>" + model.description + "</span>";
                html += "</div>\n";

                html += "<div class='col-lg-3'>\n";
                html += "<span class='issue-label hidden-lg'>CATEGORY:</span>&nbsp;";
                html += "<span class='issue-data' data-category='" +  model.category + "'>" + model.category + "</span>";
                html += "</div>\n";

                html += "<div class='col-lg-3'>\n";
                html += "<span class='issue-label hidden-lg'>PROJECT:</span>&nbsp;";
                html += "<span class='issue-data' data-project='" +  model.project + "'>" + model.project + "</span>";
                html += "</div>\n";

                html += "<div class='col-lg-2'>\n";
                html += "<span class='issue-label hidden-lg'>ASSIGNEE:</span>&nbsp;";
                html += "<span class='issue-data' data-assignee='" +  model.assignee + "'>" + model.assignee + "</span>";
                html += "</div>\n";

                html += "</div>\n";
            });

            $("#issue-tracker-list").append(html);

            this.addListener();

        }
        };

    return IssueTracker;

});