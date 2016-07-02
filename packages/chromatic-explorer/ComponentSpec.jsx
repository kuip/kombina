/* global ComponentSpec:true */
/* global React StyleguideSpec ReactMeteorData FlowRouter classnames */
import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
const { Chromatic } = Package['mdg:chromatic-api'] || {};

ComponentSpec = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      entryName: FlowRouter.getParam('entryName')
    };
  },
  componentWillMount() {
    $('body').addClass('styleguide-white');
  },
  render() {
    const {entryName} = this.data;
    const entry = Chromatic.entry(entryName);
    let meta = {type: 'component'}

    return (
      <div className="styleguide spec-container">
        <StyleguideSpec entry={entry} meta={meta}/>
      </div>
    );
  }
});
