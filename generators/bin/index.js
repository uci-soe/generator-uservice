'use strict';
var yeoman = require('yeoman-generator');
var _      = require('lodash');
var extend = require('deep-extend');
//var mkdirp = require('mkdirp');


module.exports = yeoman.Base.extend({

  prompting: function () {
    var done = this.async();

    this.option('acceptAttachment', {
      type    : Boolean,
      required: false,
      defaults: false,
      desc    : 'Server accepts file transfer'
    });

    done();
  },


  default: function () {

  },


  writing: function () {
    var pkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    extend(pkg, {
      dependencies: {
        'deep-extend': '^0.4.1',
        'restify'    : '^4.0.3'
      },
      "main"      : "lib/index.js",
      "scripts"   : {
        "start": "node ./bin/www.js"
      }
    });
    pkg.files = _.uniq(
      (pkg.files || [])
        .concat(['lib'])
    );
    this.fs.writeJSON(this.destinationPath('package.json'), pkg);


    var wwwTpl = _.template(this.fs.read(this.templatePath('www.js')));
    var libTpl = _.template(this.fs.read(this.templatePath('lib.js')));

    this.fs.write('bin/www.js', wwwTpl({
      acceptAttachment: this.options.acceptAttachment
    }));
    this.fs.write('lib/index.js', libTpl({}));

  },

  install: function () {
    //this.installDependencies({bower: false});
  }

});
