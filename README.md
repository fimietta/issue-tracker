## Components

- **Dashboard**: it creates the **IssueCollection** object then call the the fetch's collection method. When the fetch is completed, it creates the **IssueTracker** and the **FilterComponent** object passing as dependency the collection
- **IssueTracker**: has as dependency the **IssueCollection** and the **FilterComponent**. It is responsible for *rendering the collection* via the render's method and for *listening* to the '**filter**' event dispatched from the collection in order to update the interface with the filtered data.
- **IssueCollection**: it is responsible to retrieve the data from the server via the **fetch**'s method. It has a **filter** method that given a set of properties/value, it filters the collection and then it **dispatches** a new **filter event**. In this way, all the other components might update ther interface properly.
- **FilterComponent**: it has as dependency the **IssueCollection**. It is responsible for handling all the changes in the filter's form data(select change, input change). Depending on what the user set in the form, it builds a **query object** and call the method **filter** of the collection.


