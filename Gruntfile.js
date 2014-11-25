module.exports = function (grunt) {

    grunt.initConfig({

        less: {
            dev: {
                options: {
                    compress: false,
                    sourceMap: true,
                    outputSourceFiles: true
                },
                files: {
                    "web/css/all.css": "web/less/all.less"
                }
            },
            prod: {
                options: {
                    compress: true
                },
                files: {
                    "web/css/all.min.css": "web/less/all.less"
                }
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            site: {
                src: grunt.file.readJSON('web/js/all.json'),
                dest: 'web/js/all.js'
            }
        },
        copy: {
            main: {
                files: [
                    {expand: true, flatten: true, src: ['vendor/bower/bootstrap/fonts/*'], dest: 'web/fonts/', filter: 'isFile'}
                ]
            }
        },
        uglify: {
            options: {
                mangle: false  // Use if you want the names of your functions and variables unchanged
            },
            site: {
                files: {
                    'web/js/all.min.js': 'web/js/all.js'
                }
            }
        },
        watch: {
            js: {
                files: [
                    'assets/js/*.js',
                    'vendor/bower/jquery/dist/jquery.js',
                    'vendor/bower/bootstrap/dist/js/bootstrap.js',
                    'vendor/yiisoft/yii2/assets/*.js'
                ],
                tasks: ['concat', 'uglify'],
                options: {
                    livereload: true
                }
            },
            less: {
                files: ['web/less/*.less'],
                tasks: ['less'],
                options: {
                    livereload: true
                }
            },
            fonts: {
                files: ['vendor/bower/bootstrap/fonts/*'],
                tasks: ['copy'],
                options: {
                    livereload: true
                }
            }
        }
    });

    // Plugin loading
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Task definition
    grunt.registerTask('build', ['less', 'copy', 'concat', 'uglify']);
    grunt.registerTask('default', ['watch']);
};