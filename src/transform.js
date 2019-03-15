var looksLike = require('./utils/looks_like.js');
var sumValues = require('./utils/sum_values.js');
var sortValuesDesc = require('./utils/sort_values_desc.js');

module.exports = function(state) {
  let classNames, localNames;

  return {
    name: 'ast-transform',
    visitor: {
      Template: {
        enter: function() {
          classNames = {};
          localNames = {};
        },
        exit: function() {
          state.classCount = sumValues(classNames);
          state.localCount = sumValues(localNames);

          state.classNames = sortValuesDesc(classNames);
          state.localNames = sortValuesDesc(localNames);
        }
      },

      AttrNode(node) {
        const isRegularClass = looksLike(node, {
          name: 'class',
          value: {
            type: 'TextNode',
            chars(string) {
              const newName = string
                .trim()
                .split(/\s+/)
                .filter((word) => !/^eng\-/.test(word))
                .join(' ');

              if (newName == '') {
                return;
              }

              classNames[newName] = (classNames[newName] || 0) + 1;
              return true;
            }
          }
        });

        const isLocalClass = looksLike(node, {
          name: 'local-class',
          value: {
            type: 'TextNode',
            chars(string) {
              const newName = string
                .trim()
                .split(/\s+/)
                .sort()
                .join(' ');

              localNames[newName] = (localNames[newName] || 0) + 1;
              return true;
            }
          }
        });
      }
    }
  };
};
