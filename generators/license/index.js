'use strict';
var yeoman  = require('yeoman-generator');
var _       = require('lodash');
var extend  = require('deep-extend');


module.exports = yeoman.Base.extend({

  prompting: function () {},


  default: function () {
    this.pkg = extend(this.pkg || {}, {
      license: 'BSD-3-Clause'
    })
  },


  writing: function () {
    var pkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    extend(pkg, {
      license: 'BSD-3-Clause'
    });

    this.fs.writeJSON(this.destinationPath('package.json'), pkg);

    var licenseTpl = _.template(this.fs.read(this.templatePath('UCI-LICENSE.txt')));
    this.fs.write('LICENSE', licenseTpl({
      year: (new Date()).getFullYear()
    }));
  },


  install: function () {}

});
