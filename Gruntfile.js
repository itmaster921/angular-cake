module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		karma: {
  		unit: {
    		configFile: './tests/karma.conf.js'
  		}
		},
		eslint: {
        target: ['client/app/cake/cake.js']
    },
		uglify: {
    	target: {
      	files: {
        	'client/assets/js/bundle.min.js': ['client/app/*.js','client/app/**/*.js',]
      	}
    	}
  	},
		cssmin: {
		  options: {
		    shorthandCompacting: false,
		    roundingPrecision: -1
		  },
		  target: {
		    files: {
		      'client/styles/styles.min.css': ['client/bower_components/bootstrap/dist/css/bootstrap.css','client/bower_components/angular-date-picker/angular-date-picker.css','client/styles/bootstrap-social.css','client/styles/main.css', 'client/styles/font-awesome.css']
		    }
		  }
		},
		//specifying the settings for watch
		watch: {
			scripts: {
				files: ['client/app/**/*.js', 'client/styles/*.css'],
				tasks: ['default'],
				options: {
					spawn:false,
					event:['all']
				},
			},
		}
	});



	// Load the plugins
  grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-newer');

  // Default task(s)
  grunt.registerTask('default', ['eslint','newer:uglify:target','newer:cssmin:target','watch']);

	grunt.registerTask('minify', ['newer:uglify:target','newer:cssmin:target'])

	grunt.registerTask('test', ['karma']);
}
