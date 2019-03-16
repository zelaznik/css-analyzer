function addOne(object, key) {
  var origValue = object[key] || 0;
  object[key] = origValue + 1;
}

module.exports = addOne;
