define(function() {

    function FilterComponent(options) {
        this.collection = options.collection;

        this.query = {};

        this.ui = {
            selectCategory: $('select[name=filter-category]'),
            selectAssignee: $('select[name=filter-assignee]'),
            selectProject: $('select[name=filter-project]'),
            inputDescription: $('input[name=filter-description]')
        };

        this.initialize();
    }


    FilterComponent.prototype = {

        initialize: function() {
            this.setupCategoryListFilter();
            this.setupAssigneeListFilter();
            this.setupProjectListFilter();
            this.setupDescriptionTextFilter();
        },

        setupCategoryListFilter: function() {
            var categories = this.collection.getListOf('category');
            var self = this;

            this.ui.selectCategory.append($("<option />").val('').text('-- Select --'));

            _.each(categories, _.bind(function(category) {
                this.ui.selectCategory.append($("<option />").val(category).text(category));
            }, this));

            this.ui.selectCategory.on('change', function() {
                var selectedCategory = $(this).val();
                self.filterBy('category', selectedCategory);
            });

        },

        setupAssigneeListFilter: function() {
            var assignees = this.collection.getListOf('assignee');
            var self = this;

            this.ui.selectAssignee.append($("<option />").val('').text('-- Select --'));

            _.each(assignees, _.bind(function(assignee) {
                this.ui.selectAssignee.append($("<option />").val(assignee).text(assignee));
            }, this));

            this.ui.selectAssignee.on('change', function() {
                var selectedAssignee = $(this).val();
                self.filterBy('assignee', selectedAssignee);
            });

        },

        setupProjectListFilter: function() {
            var projects = this.collection.getListOf('project');
            var self = this;

            this.ui.selectProject.append($("<option />").val('').text('-- Select --'));

            _.each(projects, _.bind(function(project) {
                this.ui.selectProject.append($("<option />").val(project).text(project));
            }, this));


            this.ui.selectProject.on('change', function() {
                var selectedProject = $(this).val();
                self.filterBy('project', selectedProject);
            });
        },

        setupDescriptionTextFilter: function() {
            var self = this;

            this.ui.inputDescription.on('keyup', function() {
                var description = $(this).val();

                self.filterBy('description', description);

            });

        },

        filterBy: function(property, value, hasToUpdateUI) {
            if(value) {
                this.query[property] = value;
            } else {
                delete this.query[property];
            }

            if(hasToUpdateUI) {
                this.updateUI(property, value);
            }

            this.collection.filter(this.query);

        },

        updateUI: function(property, value) {
            switch(property) {
                case 'category':
                    this.ui.selectCategory.val(value);
                    break;
                case 'assignee':
                    this.ui.selectAssignee.val(value);
                    break;
                case 'project':
                    this.ui.selectProject.val(value);
                    break;
                case 'description':
                    this.ui.inputDescription.val(value);
                    break;

            }
        }

    };

    return FilterComponent;
});