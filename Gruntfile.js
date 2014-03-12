module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);

  var karmaConfig = function(configFile, customOptions) {
    var options = { configFile: configFile, keepalive: true };
    var travisOptions = process.env.TRAVIS && { browsers: ['Firefox'], reporters: 'dots' };
    return grunt.util._.extend(options, customOptions, travisOptions);
  };

  // Project configuration.
  grunt.initConfig({

    distdir: 'phonegap/www',

    src: {
      ionic: [
        'node_modules/ionic/release/js/ionic.bundle.js'
      ],
      js: [
        'client/**/*.js'
      ],
      sass: [
        'node_modules/ionic/scss/ionic.scss',
        'client/common/**/*.scss',
        'client/app/**/*.scss'
      ],
      tpl: {
        app: ['client/app/**/*.tpl.html'],
        common: ['client/common/**/*.tpl.html']
      },
      // templates after they have been compiled to javascript:
      jsTpl: [
        '<%= distdir %>/templates/**/*.js'
      ],
      specs: [
        'test/**/*.spec.js'
      ],
      scenarios: [
        'test/**/*.scenario.js'
      ],
      html: [
        'client/app/index.html'
      ]
    },

    pkg: grunt.file.readJSON('package.json'),

    banner:
    '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
    '<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
    ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;\n' +
    ' * Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>\n */\n',

    clean: ['<%= distdir %>/*'],

    concat:{
      dist:{
        options: {
          banner: "<%= banner %>"
        },
        src:['<%= src.ionic %>', '<%= src.js %>', '<%= src.jsTpl %>'],
        dest:'<%= distdir %>/<%= pkg.name %>.js'
      },
      index: {
        src: ['client/app/index.html'],
        dest: '<%= distdir %>/index.html',
        options: {
          process: true
        }
      }
    },

    copy: {
      assets: {
        files: [
          {
            dest: '<%= distdir %>/assets',
            src : '**',
            expand: true,
            cwd: 'client/common/assets'
          }
        ]
      },
      phonegap: {
        files: [
          {
            dest: '<%= distdir %>',
            src : ['res/**'],
            expand: true,
            cwd: 'client/'
          },
          {
            dest: '<%= distdir %>',
            src : ['fonts/**'],
            expand: true,
            cwd: 'node_modules/ionic/release/'
          },
          {
            dest: '<%= distdir %>',
            src : ['config.xml'],
            expand: true,
            cwd: 'client/'
          }
        ]
      }
    },

    html2js: {
      app: {
        options: {
          base: 'client/app'
        },
        src: ['<%= src.tpl.app %>'],
        dest: '<%= distdir %>/templates/app.js',
        module: 'templates.app'
      },
      common: {
        options: {
          base: 'client/common'
        },
        src: ['<%= src.tpl.common %>'],
        dest: '<%= distdir %>/templates/common.js',
        module: 'templates.common'
      }
    },

    jshint:{
      files:['Gruntfile.js', '<%= src.js %>', '<%= src.jsTpl %>', '<%= src.sass %>', '<%= src.specs %>', '<%= src.scenarios %>'],
      options:{
        curly:true,
        eqeqeq:true,
        immed:true,
        latedef:true,
        newcap:true,
        noarg:true,
        sub:true,
        boss:true,
        eqnull:true,
        globals:{}
      }
    },

    karma: {
      unit: { options: karmaConfig('test/config/unit.js') },
      watch: { options: karmaConfig('test/config/unit.js', { singleRun:false, autoWatch: true}) }
    },

    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          '<%= distdir %>/<%= pkg.name %>.css': ['<%= src.sass %>']
        }
      }
    },

    uglify: {
      dist:{
        options: {
          banner: "<%= banner %>"
        },
        src:['<%= src.js %>' ,'<%= src.jsTpl %>'],
        dest:'<%= distdir %>/<%= pkg.name %>.js'
      }
    },

    watch:{
      all: {
        files:['<%= src.js %>', '<%= src.specs %>', '<%= src.sass %>', '<%= src.tpl.app %>', '<%= src.tpl.common %>', '<%= src.html %>'],
        tasks:['default','timestamp']
      },
      build: {
        files:['<%= src.js %>', '<%= src.specs %>', '<%= src.sass %>', '<%= src.tpl.app %>', '<%= src.tpl.common %>', '<%= src.html %>'],
        tasks:['build','timestamp']
      }
    }
  });
  
  // Print a timestamp (useful for when watching)
  grunt.registerTask('timestamp', function() {
    grunt.log.subhead(Date());
  });

  grunt.registerTask('default', ['jshint','build','karma:unit']);
  grunt.registerTask('build', ['clean','html2js','concat','sass','copy']);
  grunt.registerTask('release', ['clean','html2js','uglify','jshint','karma:unit','concat:index', 'recess:min','copy:assets']);
};
