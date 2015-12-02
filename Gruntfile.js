module.exports = function(grunt) {

  // Configurable paths
  var config = {
    src: 'src',
    dist: 'dist'
  };

  // Project configuration.
  grunt.initConfig({
    config: config,

    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*!\n' +
      ' * <%= pkg.name %> v<%= pkg.version %>\n' +
      ' * <%= pkg.url %>\n' +
      ' * Licensed under <%= pkg.licenses %>\n' +
      ' * Author: <%= pkg.author %>\n' +
      ' * <%= pkg.author_url %>\n' +
      ' */\n',
      },
      build: {
        src: '<%= config.src %>/js/<%= pkg.name %>.js',
        dest: '<%= config.dist %>/js/<%= pkg.name %>.min.js'
      }
    },
    // Compiles Sass to CSS and generates necessary files if requested
    sass: {
      options: {
        sourceMap: false,
        sourceMapEmbed: false,
        sourceMapContents: false,
        includePaths: ['.']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.src %>/sass',
          src: ['*.{scss,sass}'],
          dest: '<%= config.dist %>/css',
          ext: '.css'
        }]
      }
    },
    postcss: {
      options: {
        map: true,
        processors: [
          // Add vendor prefixed styles
          require('autoprefixer')({
            browsers: [
              '> 1%', 
              'last 3 versions', 
              'Firefox ESR', 
              'IE 8',
              'Android 2.3',
              'Android >= 4',
              'Chrome >= 20',
              'Firefox >= 24',
              'Explorer >= 8',
              'iOS >= 6',
              'Opera >= 12',
              'Safari >= 6'
            ]
          })
        ]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.dist %>/css/',
          src: '{,*/}*.css',
          dest: '<%= config.dist %>/css/'
        }]
      }
    },
    cssmin: {
      dist: {
        files: {
          '<%= config.dist %>/css/ripple.min.css': [
            '<%= config.dist %>/css/{,*/}*.css'
          ]
        }
      }
    },
    // Empties folders to start fresh
    clean:  [ '<%= config.dist %>/*', '!<%= config.dist %>/.git*' ],
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Default task(s).
  grunt.registerTask('default', ['clean', 'uglify', 'sass', 'postcss', 'cssmin']);

};
