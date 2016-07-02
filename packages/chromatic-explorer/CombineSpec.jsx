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

Chromatic.add(CombinationRoot, {
  specs: [
    new Chromatic.Spec('New component', {props: {name: 'New component'}}),
  ]
});


CombineSpec = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      tree: decodeURIComponent(FlowRouter.getQueryParam('tree')),
      selected: FlowRouter.getQueryParam('selected')
    };
  },
  componentWillMount() {
    $('body').addClass('styleguide-white');
  },
  render() {
    let {tree, selected} = this.data;
    tree = JSON.parse(tree);
    let meta;
    const combinations = tree[0].children.map(function(c) {
      let names = c._id.split('_');
      let entry = Chromatic.entry(names[0]);
      meta = null;
      if(selected == c._id)
        meta = {type: 'combine'};
      return (
        <StyleguideSpec key={c._id} entry={entry} specName={names[1]} newprops={JSON.parse(c.props)} meta={meta}/>
      );
    })

    meta = null;
    if(selected == 'newcomp')
      meta = {type: 'combine'};
    let newprops = {children: combinations}

    return (
      <div className="styleguide spec-container">
        <StyleguideSpec key="newcomp" entry={Chromatic.entry('CombinationRoot')} specName="New component" meta={meta} newprops={newprops}/>
      </div>
    );

    /*return (
      <div className="styleguide spec-container">
        <CombinationRoot>
          {combinations}
        </CombinationRoot>
      </div>
    );*/
  }
});