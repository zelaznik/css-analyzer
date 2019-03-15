var classCount = require("./class_counter.js");
var exec = require('child_process').exec;
var fs = require("fs");

exec(
  `cd ~/src/icisstaff/facesheet/app/templates/components/; git ls-files | egrep "\.hbs$" | gsed "s/\.hbs$//"`,
  function (error, stdout, stderr) {
    if (error !== null) {
      console.log(`exec error: ${error}`);
    }

    if (stderr !== '') {
      console.error(stderr);
      return;
    }

    var components = stdout
      .trim()
      .split('\n')
      .map((v) => v.trim());

    var data = {};
    components.forEach(function(component, index) {
      data[component] = classCount(component);
      process.stdout.write('.');
    });

    console.log('');

    fs.writeFileSync(process.argv[2], JSON.stringify(data, null, 2));
  }
);
