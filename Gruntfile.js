'use strict';
module.exports = function(grunt) {
    // var _ = require('lodash');
    // https://github.com/sindresorhus/time-grunt
    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    var sourceMapLoc = 'app.css.map';

    var sassPatterns = [
        'app/common/sass/*.scss',
        'app/common/sass/**/*.scss'
    ];

    var jsPatterns = [
        'Gruntfile.js',
        'app/*.js',
        'app/**/*.js',
        'app/common/*.js',
        'app/common/**/*.js'
    ];

    var ignorePatterns = [
        'app/bower_components/**'
    ];

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // https://github.com/nDmitry/grunt-autoprefixer
        autoprefixer: {
            options: {
                browsers: [
                    '> 5%',
                    'last 2 versions',
                ],
                map: true
            },
            src: 'app/app.css',
            dest: 'app/app.css'
        },
        // https://github.com/sindresorhus/grunt-concurrent
        concurrent: {
            'dev': {
                tasks: [
                    'nodemon:dev',
                    'watch:server',
                    'watch:dev'
                ],
                options: {
                    logConcurrentOutput: true
                }
            }
        },
        // https://github.com/gruntjs/grunt-contrib-jshint
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                ignores: ignorePatterns,
                reporter: require('jshint-stylish')
            },
            all: jsPatterns
        },
        // https://github.com/ChrisWren/grunt-nodemon
        nodemon: {
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
        },
        // https://github.com/jsoverson/grunt-plato
        plato: {
            'report': {
                options: {
                    jshint: grunt.file.readJSON('.jshintrc'),
                    exclude: /tests\/*/
                },
                files: {
                    'plato_report/<%= grunt.template.today("yyyy-mm-dd") %>': jsPatterns
                }
            }
        },
        // https://github.com/sindresorhus/grunt-sass
        sass: {
            'dev': {
                options: {
                    outputStyle: 'expanded',
                    sourceComments: 'map',
                    sourceMap: sourceMapLoc
                },
                files: {
                    'app/app.css': 'app/common/sass/app.scss'
                }
            }
        },
        // https://github.com/cri5ti/grunt-shell-spawn
        // shit blocks the watch task -.-
        shell: {
            'mongo': {
                command: 'mongod',
                options: {
                    async: true
                }
            },
            options: {
                stdout: true
            }
        },
        // https://github.com/gruntjs/grunt-contrib-watch
        watch: {
            'dev': {
                options: {
                    interrupt: true,
                    spawn: false,
                },
                files: [sassPatterns],
                tasks: [
                    'sass:dev'
                ]
            },
            'server': {
                files: ['.rebooted'],
                options: {
                    livereload: true
                }
            }
        }
    });

    grunt.registerTask('default', [
        'jshint',
        'sass',
        'concurrent:dev'
    ]);

    grunt.registerTask('reporting', [
        'plato:report'
    ]);

    grunt.registerTask('release', [
        'jshint'
    ]);
};
