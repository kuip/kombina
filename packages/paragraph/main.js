import { checkNpmVersions } from 'meteor/tmeasday:check-npm-versions';

checkNpmVersions({
  'react': '^15.0.0'
}, 'kuip:kombina-paragraph');

export { SimpleButton } from './Paragraph.jsx';