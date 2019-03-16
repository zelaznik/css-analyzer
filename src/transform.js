var glimmer = require('@glimmer/syntax');

var addOne = require('./utils/add_one.js');
var looksLike = require('./utils/looks_like.js');
var sumValues = require('./utils/sum_values.js');
var sortValuesDesc = require('./utils/sort_values_desc.js');

module.exports = function(state) {
  let classNames, localNames, concatNames;

  return {
    name: 'ast-transform',
    visitor: {
      Template: {
        enter: function() {
          concatNames = {};
          classNames = {};
          localNames = {};
        },
        exit: function() {
          state.classCount = sumValues(classNames);
          state.localCount = sumValues(localNames);
          state.concatCount = sumValues(concatNames);

          state.classNames = sortValuesDesc(classNames);
          state.localNames = sortValuesDesc(localNames);
          state.concatNames = sortValuesDesc(concatNames);
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
                .filter((word) => !/^eng[-_]/.test(word))
                .join(' ');

              if (newName == '') {
                return;
              }

              addOne(classNames, newName);
              return true;
            }
          }
        });

        const isComputedClass = looksLike(node, {
          name: 'class',
          value: {
            type: (t) => t === 'MustacheStatement' || t === 'ConcatStatement'
          }
        });

        if (isComputedClass) {
          let newName = glimmer
            .print(node.value)
            .replace(/^[\"\']/, '')
            .replace(/[\'\"]$/, '');

          addOne(classNames, newName);
        }

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

              addOne(localNames, newName);
              return true;
            }
          }
        });
      }
    }
  };
};
