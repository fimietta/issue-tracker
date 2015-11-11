// For any third party dependencies, like jQuery, place them in the lib folder.

// Configure loading modules from the scripts directory,
requirejs.config({
    baseUrl: 'scripts',
    paths: {

    }
});

// Start loading the main app file. Put all of
// your application logic in there.
requirejs(['app']);
