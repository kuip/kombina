const {loadNpm} = Package['kuip:load-npm'];
console.log('we are in main.js - nested list')
//Npm.depends({'react-nestedlist': '0.0.3', 'react-immutable-proptypes': '1.7.1'});
/*if(!loadNpm.check('react-nestedlist', '0.0.3'))
  loadNpm('react-nestedlist')
if(!loadNpm.check('react-immutable-proptypes', '1.7.1'))
  loadNpm('react-immutable-proptypes')*/


let loaded = loadNpm({'react-nestedlist': '0.0.3', 'react-immutable-proptypes': '1.7.1'}, 'client')
console.log('loaded: ')
console.log(loaded)
if(loaded)
  require('react-nested-list');