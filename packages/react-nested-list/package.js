Package.describe({
  name: 'kuip:react-nested-list',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});


Npm.depends({'react-nestedlist': '0.0.3', 'react-immutable-proptypes': '1.7.1'});

Package.onUse(function(api) {
  api.versionsFrom('1.3.4');
  api.use(['ecmascript'])//, 'kuip:load-npm']);
  //api.mainModule('main.js');
  api.mainModule('react-nested-list.js');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('kuip:react-nested-list');
  api.mainModule('react-nested-list-tests.js');
});
