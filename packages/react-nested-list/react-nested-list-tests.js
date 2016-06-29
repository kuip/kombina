// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by react-nested-list.js.
import { name as packageName } from "meteor/kuip:react-nested-list";

// Write your tests here!
// Here is an example.
Tinytest.add('react-nested-list - example', function (test) {
  test.equal(packageName, "react-nested-list");
});
