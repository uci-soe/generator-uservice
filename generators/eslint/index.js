'use strict';
var generators = require('yeoman-generator');
var extend = require('lodash').merge;

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);

    this.option('generateInto', {
      type: String,
      required: false,
      defaults: '',
      desc: 'Relocate the location of the generated files.'
    });
  },

  writing: function () {
    var pkg = this.fs.readJSON(this.destinationPath(this.options.generateInto, 'package.json'), {});

    var eslintConfig = {
      extends: 'rhett'
    };
    var devDep = {
      'eslint-config-rhett': '^0.1.0'
    };

    extend(pkg, {
      devDependencies: devDep,
      eslintConfig: eslintConfig
    });

    this.fs.writeJSON(this.destinationPath(this.options.generateInto, 'package.json'), pkg);
  }
});
