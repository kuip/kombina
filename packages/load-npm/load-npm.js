import npm from 'npm';
import semver from 'semver';

console.log('load-npm loaded')

function load(packages) {
  if(!Array.isArray(packages))
    packages = [packages]
  console.log('loadNpm: ' + JSON.stringify(packages))
  npm.load(function(err) {
    // handle errors
    console.log('npm load')
    console.log(err)

    // install module ffi
    npm.commands.install(packages, function(er, data) {
      // log errors or data
      console.log('install')
      console.log(er)
      console.log(data)
    });

    npm.on('log', function(message) {
      // log installation progress
      console.log('log')
      console.log(message);
    });
  });
}

function check(name, range) {
  console.log('check: ' + name + ' - ' + range)
  try {
    const installedVersion = require(`${name}/package.json`).version; 
    console.log('installedVersion: ' + installedVersion)
    if (semver.satisfies(installedVersion, range)) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.log('catch err')
    // XXX add something to the tool to make this more reliable
    const message = e.toString();
    // One message comes out of the install npm package the other from npm directly
    if (message.match("Cannot find module") || message.match("Can't find npm module")) {
      return false;
    } else {
      throw e;
    }
  }
}


export const loadNpm = function(packages, env) {
  let res = true
  for(p in packages) {
    let ch = true
    if(!env || (env == 'client' && Meteor.isClient) || (env == 'server' && Meteor.isServer)) {
      ch = check(p, packages[p])
    }
    console.log('env: ' + env + ', ch: ' + ch)
    if(!ch) {
      load(p)
      res = false
    }
  }
  return res
}