/* global ComponentSpec:true */
/* global React StyleguideSpec ReactMeteorData FlowRouter classnames */
import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
const { Chromatic } = Package['mdg:chromatic-api'] || {};


CombinationRoot = React.createClass({
  propTypes: {
    children: React.PropTypes.node
  },
  render() {
    return (
      <div id="newcomponent">{this.props.children}</div>
    );
  }
})


CombineSpec = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      tree: decodeURIComponent(FlowRouter.getQueryParam('tree'))
    };
  },
  componentWillMount() {
    $('body').addClass('styleguide-white');
  },
  render() {
    let {tree} = this.data;
    tree = JSON.parse(tree);
    const combinations = tree[0].children.map(function(c) {
      let names = c._id.split('_')
      let entry = Chromatic.entry(names[0])
      return (
        <StyleguideSpec key={c._id} entry={entry} specName={names[1]} newprops={JSON.parse(c.props)}/>
      );
    })

    return (
      <div className="styleguide spec-container">
        <CombinationRoot>
          {combinations}
        </CombinationRoot>
      </div>
    );
  }
});