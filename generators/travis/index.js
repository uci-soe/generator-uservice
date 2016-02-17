'use strict';
var yeoman = require('yeoman-generator');
var _ = require('lodash');

module.exports = yeoman.Base.extend({
  writing: function () {
    var travis = _.template(this.fs.read(this.templatePath('travisyml')));
    this.fs.write(this.destinationPath('.travis.yml'), travis({

    }))
  }
});
