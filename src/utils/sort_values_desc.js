function sortValuesDesc(object) {
  var sorted_keys = Object.keys(object).sort(function(a, b) {
    return object[b] - object[a];
  });

  var data = {};

  sorted_keys.forEach(function(key) {
    data[key] = object[key];
  });

  return data;
}

module.exports = sortValuesDesc;
