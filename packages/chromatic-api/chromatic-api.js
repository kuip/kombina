/* global Chromatic:true */
import React from 'react';

/**
 * Chromatic API
 */
export const Chromatic = {
  /**
   * Constructs a styleguided component entry
   * @param {React.Component} component
   * @param {Object} [options]
   *    specs: {Optional Array} - a list of specs supported
   *    isPage: {Optional Boolean} - should it be displayed on it's own
   *      (rather than inside the component styleguide)? (NOTE cannot have specs)
   *    name: {Optional String} - change the entry's name (from it's displayName)
   * @returns {Object} the constructed component object
   */
  Entry(component, options) {
    check(component, Function);

    // how to check this?
    check(component, React.Component.constructor);
    check(options, Match.Optional({
      specs: Match.Optional(Array),
      isPage: Match.Optional(Boolean),
      name: Match.Optional(String),
      icon: Match.Optional(String),
      showControls: Match.Optional(Boolean)
    }));

    if (options && options.specs && options.isPage) {
      throw new Meteor.Error('argument-error', 'Cannot have specs for a styleguide page entry');
    }

    this.name = (options && options.name) || component.displayName;
    this.component = component;
    this.specs = (options && options.specs) || [Chromatic.defaultSpec()];
    this.isPage = (options && options.isPage) || false;
    this.icon = (options && options.icon) || false;
    this.showControls = (options && options.showControls) || true;
  },

  /**
   * Constructs a component spec for the styleguide
   * @param {String} name - the name of the spec
   * @param {Object} [options]
   *    setup: {Optional Function} - a function to run before the spec
   *    teardown: {Optional Function} - a function to run after the spec
   *    props: {Optional Object|Function} - the props of the spec
   * @returns {Object} the constructed spec object
   */
  Spec(name, options) {
    check(name, String);
    check(options, {
      setup: Match.Optional(Function),
      teardown: Match.Optional(Function),
      props: Match.OneOf(Object, Function),
      //state: Match.OneOf(Object, Function)
    });

    this.name = name;
    this.setup = options.setup;
    this.teardown = options.teardown;
    this.props = options.props;
    //this.state = options.state;
  },

  defaultSpec() {
    return new Chromatic.Spec('default', {
      props: {}
    });
  },

  /**
   * Adds a react component to the styleguide
   * @param {Object} component - a React Component
   * @returns {void}
   */
  add(component, options) {
    this.addEntry(new Chromatic.Entry(component, options));
  },

  /**
   * Adds a styleguided entry to the styleguide
   * @param {Object} entry - an instance of Chromatic.Entry
   * @returns {void}
   */
  addEntry(entry) {
    check(entry, Chromatic.Entry);
    Chromatic._entries[entry.name] = entry;
  },

  /**
   * Gets a styleguide entry
   * @param {String} name - the name of the entry
   * @returns {Object} entry - an instance of Chromatic.Entry
   */
  entry(name) {
    check(name, String);
    return Chromatic._entries[name];
  },

  spec(entry, specName) {
    check(entry, Chromatic.Entry);
    check(specName, String);
    let spec = _.find(entry.specs, s => s.name === specName);
    return spec;
  },

  /**
   * Adds a styleguided entry to the kombine temporary tree
   * @param {Object} component - a React Component
   * @returns {void}
   */
  kombine(entryName, specName, newprops) {
    var entry = this.entry(entryName);
    if(!entry)
      return;
    if(!this.spec(entry, specName))
      return;
    let name = entryName + '_' + specName + '_' + Chromatic._kombins.length;
    Chromatic._kombins.push({
      _id: name, label: name, props: newprops, children:[]
    })
  },

  /**
   * Adds css classes for an entry
   * @param {String} type - the name of the entry
   * @param {Array} classes - the css classes
   * @returns {void}
   */
  addClass(type, classes) {
    check(type, String);
    check(classes, [String]);
    Chromatic._classes[type] = _.uniq((Chromatic._classes[type] || []).concat(classes));
  },

  /**
   * Gets css classes for an entry
   * @param {String} name - the name of the entry
   * @returns {Array}
   */
  classes(name) {
    check(name, String);
    return Chromatic._classes[name];
  },

  /**
   * Adds a plugin called after rendering entries
   * @param {Function} callback - callback function
   * @returns {void}
   */
  addPlugin(obj) {
    check(obj, Object);
    Chromatic._plugins.push(obj);
  },

  /**
   * Returns the list of non-page styleguide entries
   * @returns {[Chromatic.Entry]}
   */
  allEntries: function() {
    const entries = _.values(Chromatic._entries);
    const componentEntries = _.filter(entries, (entry) => !entry.isPage);
    return _.sortBy(componentEntries, (entry) => entry.name);
  },

  /**
   * Returns the list of page styleguide entries
   * @returns {[Chromatic.Entry]}
   */
  allPages: function() {
    const entries = _.values(Chromatic._entries);
    return _.filter(entries, (entry) => entry.isPage);
  },

  /**
   * Returns the list of css classes
   * @returns {[String]}
   */
  allClasses: function() {
    return Chromatic._classes;
  },

  /**
   * Returns the list of plugins
   * @returns {[String]}
   */
  allPlugins: function() {
    return Chromatic._plugins;
  },

  allKombins: function() {
    let tree = [{
      _id: 'newcomp',
      label: 'New component',
      children: []
    }]
    tree[0].children = Chromatic._kombins
    return tree
  },

   /**
   * A dict that contains the list of styleguide entries
   */
  _entries: {},

  /**
   * A dict that contains the list of css classes for the entries
   */
  _classes: {},

  /**
   * A dict that contains the list of plugins called after rendering entries
   */
  _plugins: [],

  _kombins: []
};
