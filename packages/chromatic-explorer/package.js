Package.describe({
  name: 'mdg:chromatic-explorer',
  version: '0.1.1',
  summary: 'chromatic component explorer',
  git: 'https://github.com/meteor/chromatic',
  debugOnly: true,
  documentation: null
});

Package.onUse(function(api) {
  api.versionsFrom('1.3');
  api.use([
    'underscore',
    'ecmascript',
    'less',
    'check',
    'kadira:flow-router@2.4.0',
    'mdg:classnames@0.1.0',
    'mdg:flow-router-extensions@0.0.1',
    'mdg:chromatic-api@0.1.0',
    'mdg:form-components@0.1.0',
    'mdg:color-grid@0.1.0',
    'mdg:outlines@0.1.0',
    'kuip:react-nested-list'
  ], 'client');

  api.addFiles([
    'ApolloPage.jsx',
    'ApolloSpec.jsx',
    'ApolloPageSidebar.jsx',
    'ChromaticExplorer.js',
    'ChromaticLayout.jsx',
    'ChromaticLayout.less',
    'CombinePage.jsx',
    'CombineSpec.jsx',
    'CombinePageSidebar.jsx',
    'CombinePageSidebar.less',
    'ComponentsPage.jsx',
    'ComponentsPageSidebar.jsx',
    'ComponentSpec.jsx',
    'ComponentSpec.less',
    'PageToggleButton.jsx',
    'PageToggleButton.less',
    'SingleComponentPage.jsx',
    'SingleComponentPageHeader.jsx',
    'SingleComponentPageSidebar.jsx',
    'StyleguideNotFound.jsx',
    'StyleguideReadme.jsx',
    'StyleguideSpec.jsx',
    'StylesPage.jsx',
    'StylesPage.less',
    'StylesPageSidebar.jsx'
  ], 'client');

  api.addFiles([
    'styles/Buttons.jsx',
    'styles/Color.jsx',
    'styles/Forms.jsx',
    'styles/Icons.jsx',
    'styles/Table.jsx',
    'styles/Typography.jsx'
  ], 'client');

  api.addAssets([
    'logotype-kombina.svg'
  ], 'client');

  api.export([
    'ChromaticExplorer',
    'ChromaticLayout',
    'StyleguideSpec'
  ], 'client');
});
