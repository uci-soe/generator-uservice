'use strict';
var path     = require('path');
var yeoman   = require('yeoman-generator');
var chalk    = require('chalk');
var yosay    = require('yosay');
var askName  = require('inquirer-npm-name');
var _        = require('lodash');
var extend   = require('deep-extend');
var entities = require('html-entities').AllHtmlEntities;
//var mkdirp = require('mkdirp');


module.exports = yeoman.Base.extend({

  prompting: {
    name        : function () {
      var done = this.async();

      // Have Yeoman greet the user.
      this.log(yosay(
        'Bork bork bork, Tudey ve-a\'re-a guing tu meke-a a ' + chalk.red('meecru serfice') + '!'
      ));

      askName({
        name    : 'name',
        message : 'Your microservice name',
        default : _.kebabCase(path.basename(process.cwd())),
        filter  : _.kebabCase,
        validate: function (str) {
          return str.length > 0;
        }
      }, this, function (name) {
        this.props = extend(this.props || {}, {name: name});
        done();
      }.bind(this));

    },
    otherPrompts: function () {
      var done = this.async();

      var prompts = [
        {
          type   : 'confirm',
          name   : 'acceptFiles',
          message: 'Will this microservice accept files?',
          default: false
        }, {
          type   : 'input',
          name   : 'ghOrg',
          message: 'GitHub username or organization',
          default: 'uci-soe'
        }
      ];

      this.prompt(prompts, function (props) {
        extend(this.props, props);
        // To access props later use this.props.someOption;

        done();

      }.bind(this));
    }
  },


  writing: function () {
    var pkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    extend(pkg, {
      devDependencies: {
        request: '^2.69.0'
      },
      "engines"      : {
        "node": ">=4.0.0"
      }
    });
    pkg.keywords = _.uniq(
      (pkg.keywords || [])
        .concat(['rest', 'microservice'])
    );

    this.fs.writeJSON(this.destinationPath('package.json'), pkg);
  },


  default: function () {
    //if (path.basename(this.destinationPath()) !== this.props.name) {
    //  this.log(
    //    'Your generator must be inside a folder named ' + this.props.name + '\n' +
    //    'I\'ll automatically create this folder.'
    //  );
    //  mkdirp(this.props.name);
    //  this.destinationRoot(this.destinationPath(this.props.name));
    //}

    var readmeTpl = _.template(this.fs.read(this.templatePath('README.md')));
    this.composeWith('node:app', {
      options: {
        name         : this.props.name,
        githubAccount: this.props.ghOrg,
        //description: this.props.desc,

        skipInstall     : true,
        boilerplate     : true,
        includeCoveralls: true,
        gulp            : true,

        babel  : false,
        license: false,
        travis : false,
        readme : readmeTpl({
          name : this.props.name,
          ghOrg: this.props.ghOrg
        }).replace(/"/g, '\"')
      }
    }, {
      local: require('generator-node').app
    });

    this.composeWith('license', {
      options: {}
    }, {
      local: require.resolve('../license')
    });

    this.composeWith('bin', {
      options: {}
    }, {
      local: require.resolve('../bin')
    });

    this.composeWith('travis', {
      options: {}
    }, {
      local: require.resolve('../travis')
    });

    this.composeWith('eslint', {
      options: {}
    }, {
      local: require.resolve('../eslint')
    });
  },

  conflicts: {
    readme: function () {
      var readme = this.fs.read(this.destinationPath('README.md'));

      if (readme) {
        // Deal with html encoding
        readme = entities.decode(readme);
        readme = readme.replace(
          /BSD-3-Clause © \[[^\]]+\]\([^)]+\)/i,
          'BSD-3-Clause - [LICENSE](LICENSE)'
        );
        this.fs.write(this.destinationPath('README.md'), readme);
      }
    },
    gitignore: function () {
      var gignore = this.fs.read(this.destinationPath('.gitignore'));
      if (gignore) {
        gignore = _.uniq(
          gignore
            .split(/[\r\n]+/)
            .concat(['', 'config.json', 'pm2.json'])
        ).join('\r\n');

        this.fs.write(this.destinationPath('.gitignore'), gignore);
      }
    },
    pkg: function () {
      var pkg = this.fs.readJSON(this.destinationPath('package.json'));
      if (pkg) {
        pkg.keywords = _.uniq(pkg.keywords)
          .filter(function (i) {
            return !!i;
          });

        this.fs.writeJSON(this.destinationPath('package.json'), pkg);
      }
    }
  },


  install: function () {
    this.installDependencies({bower: false});
  }

})
;
