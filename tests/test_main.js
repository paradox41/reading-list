var tests = [];
for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
        if (/Spec\.js$/.test(file)) {
            tests.push(file);
        }
    }
}

require([
    'app/config.js'
], function(config) {
    requirejs.config({
        // ask Require.js to load these files (all our tests)
        deps: tests,
        // baseUrl: '',
        // start test run, once Require.js is done
        callback: window.__karma__.start
    });
});
