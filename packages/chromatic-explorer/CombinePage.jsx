/* global CombinePage:true */
/* global React FlowRouter ChromaticLayout StyleguideReadme ComponentsPageSidebar
ReactMeteorData SingleComponentPage */
import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
const {Chromatic} = Package['mdg:chromatic-api'] || {};

CombinePage = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      tree: decodeURIComponent(FlowRouter.getQueryParam('tree'))
    };
  },
  getInitialState() {
    return ({
      viewport: 'tablet',
      color: 'lightest',
      iframeLoaded: false
    });
  },
  componentWillMount() {
    $('body').addClass('styleguide-dark');
  },
  onSpecChange(name, value, values) {
    this.setState({specName: values.specName});
    this._iframe.Package['kadira:flow-router'].FlowRouter.setParams(values);
  },
  onViewportClick(size) {
    this.setState({viewport: size});
  },
  onBackgroundChange(color) {
    const $iframeSpecContainer = this._iframe.$('.spec-container');
    const lastColor = this.state.color;
    $iframeSpecContainer.removeClass(lastColor);
    $iframeSpecContainer.addClass(color);
    this.setState({color});
  },
  onIframeLoad() {
    this.setState({iframeLoaded: true});
    const $iframeSpecContainer = this._iframe.$('.spec-container');
    $iframeSpecContainer.addClass(this.state.color);
  },
  getIframeRef(iframe) {
    const iframeContent = iframe && (iframe.contentWindow || iframe.contentDocument);
    this._iframe = iframeContent;
  },
  render() {
    const {viewport, color, iframeLoaded} = this.state;
    const isBrowser = viewport === 'browser';
    const parent = (<CombinePageParent/>);
    let tree = this.data.tree;
    if(Chromatic._kombins.length || !tree || tree == 'undefined')
      tree = encodeURIComponent(JSON.stringify(Chromatic.allKombins()));
    const url = `${Meteor.absoluteUrl()}styleguide/_kombine?tree=${tree}`;
    const iframeContainer = (
      <div className={classnames('iframe-container', viewport)}>
        <iframe onLoad={this.onIframeLoad} ref={this.getIframeRef} src={url}/>
      </div>
    );
    tree = decodeURIComponent(tree);
    const sidebar = (
      <CombinePageSidebar onSpecChange={this.onSpecChange} tree={tree}/>
    );
    const className = classnames('styleguide-content', {'full-width': isBrowser, 'iframe-loaded': iframeLoaded});

    return (
      <ChromaticLayout sidebar={sidebar} showSidebar={!isBrowser}>
        <div className={className}>
          {iframeContainer}
          <div className="loading-grid">
            <ColorGrid/>
          </div>
        </div>
      </ChromaticLayout>
    );
  }
})


Chromatic.add(CombinePage, {name: 'kombine', icon: '/icons/K2.svg', isPage: true});
