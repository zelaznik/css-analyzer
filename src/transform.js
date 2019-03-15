var looksLike = require('./utils/looks_like.js');
var sumValues = require('./utils/sum_values.js');

module.exports = function() {
  let classNames;
  let localNames;

  return {
    name: 'ast-transform',
    visitor: {
      Template: {
        enter: function() {
          classNames = {};
          localNames = {};
        },
        exit: function() {
          const classCount = sumValues(classNames);
          const localCount = sumValues(localNames);
          const progress = Math.round(
            (100 * localCount) / (localCount + classCount)
          );
          console.log(
            `${progress}% complete, ${localCount} local classes, ${classCount} regular classes`
          );
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
