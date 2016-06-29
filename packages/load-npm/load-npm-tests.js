// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by load-npm.js.
import { name as packageName } from "meteor/kuip:load-npm";

// Write your tests here!
// Here is an example.
Tinytest.add('load-npm - example', function (test) {
  test.equal(packageName, "load-npm");
});
