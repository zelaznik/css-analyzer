function sumValues(object) {
  var total = 0;

  for (var key in object) {
    total += object[key];
  }

  return total;
}

module.exports = sumValues;
