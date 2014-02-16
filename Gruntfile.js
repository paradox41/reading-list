'use strict';
module.exports = function (grunt) {
    // var _ = require('lodash');
    // https://github.com/sindresorhus/time-grunt
    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    var sourceMapLoc   = 'app.css.map';

    var sassPatterns   = [
        'app/common/sass/*.scss',
        'app/common/sass/**/*.scss'
    ];

    var jsPatterns     = [
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
            tasks: [
                'nodemon:dev',
                'watch:development'
            ],
            options: {
                logConcurrentOutput: true
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
        meta: {
            banner: '/*!\n' +
                '* <%= pkg.name %>\n' +
                '* v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
                '* (c) <%= pkg.author.name %>;' +
                ' <%= pkg.license %> License\n' +
                '*/\n'
        },
        // https://github.com/ChrisWren/grunt-nodemon
        nodemon: {
            'dev': {
                options: {
                    file: 'server.js',
                    nodeArgs: ['--debug'],
                    env: {
                        PORT: '8080'
                    }
                }
            }
        },
        // https://github.com/jsoverson/grunt-plato
        plato: {
            'report': {
                options: {
                    jshint : grunt.file.readJSON('.jshintrc'),
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
            'development': {
                options: {
                    interrupt: true,
                    spawn: false,
                    livereload: true
                },
                files: sassPatterns,
                tasks: [
                    'sass:dev'
                ]
            }
        }
    });

    grunt.registerTask('default', [
        'jshint',
        'sass',
        'watch:development'
        // 'concurrent'
    ]);

    grunt.registerTask('reporting', [
        'plato:report'
    ]);

    grunt.registerTask('release', [
        'jshint'
    ]);
};
