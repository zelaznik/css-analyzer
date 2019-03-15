var glimmer = require('@glimmer/syntax');
var parser = require('@babel/parser');
var fs = require('fs');

var transform = require("./transform.js");

var component_name = 'admissions/admission-form';
var root_dir = '/Users/steve.zelaznik/src/icisstaff/facesheet/app';
var hbs_path = `${root_dir}/templates/components/${component_name}.hbs`;
var js_path = `${root_dir}/components/${component_name}.js`;

var hbs_template = fs.readFileSync(hbs_path) + '';
var js_code = fs.readFileSync(js_path) + '';

var hbs_ast = glimmer.preprocess(hbs_template, {
  plugins: {
    ast: [transform]
  }
});
