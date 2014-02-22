'use strict';

var config = require('../config');

// https://github.com/ChrisWren/grunt-nodemon
module.exports = {
    'dev': {
        script: 'server.js',
        options: {
            nodeArgs: ['--debug'],
            env: {
                PORT: '8080'
            },
            // omit this property if you aren't serving HTML files and
            // don't want to open a browser tab on start
            callback: function(nodemon) {
                nodemon.on('log', function(event) {
                    console.log(event.colour);
                });

                // opens browser on initial server start
                nodemon.on('config:update', function() {
                    // Delay before server listens on port
                    setTimeout(function() {
                        require('open')('http://localhost:8080');
                    }, 1000);
                });

                // refreshes browser when server reboots
                nodemon.on('restart', function() {
                    // Delay before server listens on port
                    setTimeout(function() {
                        require('fs').writeFileSync('.rebooted', 'rebooted');
                    }, 1000);
                });
            }
        }
    }
};
