const Handlebars = require('handlebars/runtime');

Handlebars.registerHelper('object', function ({ hash }) {
  // Use object like this: (object name="steve" age=40)
  return hash;
})

Handlebars.registerHelper('array', function () {
  // Use array like this: (array 40 "40" 2)
  return Array.from(arguments).slice(0, arguments.length - 1);
})

Handlebars.registerHelper('isDefined', function (value) {
  // Use isDefined like this: (isDefined sampleVar)
  return value !== undefined;
});

Handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
  // Use isDefined like this: (ifEquals sampleString "This is a string" )
  return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

module.exports = Handlebars;