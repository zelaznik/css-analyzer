var glimmer = require('@glimmer/syntax');
var parser = require('@babel/parser');
var fs = require('fs');

var transform = require("./transform.js");

var root_dir = '/Users/steve.zelaznik/src/icisstaff/facesheet/app';

function classCounter(componentName) {
  var hbs_path = `${root_dir}/templates/components/${componentName}.hbs`;
  var js_path = `${root_dir}/components/${componentName}.js`;

  var hbs_template = fs.readFileSync(hbs_path) + '';

  var state = {};

  var hbs_ast = glimmer.preprocess(hbs_template, {
    plugins: {
      ast: [ transform.bind(null, state) ]
    }
  });

  return state;
}

module.exports = classCounter;
