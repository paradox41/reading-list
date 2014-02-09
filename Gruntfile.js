'use strict';
module.exports = function (grunt) {
    // var _ = require('lodash');

    require('load-grunt-tasks')(grunt);

    var sourceMapLoc   = 'app.css.map';

    var sassPatterns   = [
        'app/common/sass/**/*.scss'
    ];

    var jsPatterns     = [
        'Gruntfile.js',
        'app/common/*.js',
        'app/common/**/*.js'
    ];

    var ignorePatterns = [
        'app/bower_components/**'
    ];

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
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
        // https://github.com/sindresorhus/grunt-sass
        sass: {
            'app': {
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
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                ignore: ignorePatterns
            },
            all: jsPatterns
        },
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
                    'sass:app'
                ]
            }
        }
    });

    grunt.registerTask('default', [
        'jshint',
        'sass',
        'watch:development'
    ]);

    grunt.registerTask('watch', [
        'watch:development'
    ]);

    grunt.registerTask('reporting', [
        'plato:report'
    ]);

    grunt.registerTask('release', [
        'jshint'
    ]);
};
