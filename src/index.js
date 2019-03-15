var classCount = require("./class_counter.js");
const exec = require('child_process').exec;

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
      console.error(`Finished ${index + 1} out of ${components.length}.  ${component}`);
    });

    console.log(JSON.stringify(data, 2, null));
  }
);

