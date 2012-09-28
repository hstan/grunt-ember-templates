module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    lint: {
      all: ['grunt.js', 'tasks/*.js', '<config:nodeunit.tasks>']
    },

    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true,
        es5: true
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      test: ['tmp']
    },

    // Configuration to be run (and then tested).
    ember_handlebars: {
      default: {
        files: {
          'tmp/default.js': ['test/fixtures/text.hbs',
                             'test/fixtures/simple.hbs',
                             'test/fixtures/grandparent/parent/child.hbs']
        }
      },
      truncated_template_names: {
        options: {
          templateName: function(filename) {
            return filename.replace(/test\/fixtures\//, '');
          }
        },
        files: {
          'tmp/truncated_template_names.js': ['test/fixtures/text.hbs',
                                              'test/fixtures/simple.hbs',
                                              'test/fixtures/grandparent/parent/child.hbs']
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tasks: ['test/*_test.js']
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // The clean plugin helps in testing.
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.renameTask('test', 'nodeunit');
  grunt.registerTask('test', 'clean ember_handlebars nodeunit');

  // By default, lint and run all tests.
  grunt.registerTask('default', 'lint test');
};
