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
      tree: FlowRouter.getQueryParam('tree')
    };
  },
  getInitialState() {
    let tree = Chromatic._kombins.length ? Chromatic.allKombins() : null

    return ({
      viewport: 'tablet',
      color: 'lightest',
      iframeLoaded: false,
      tree: tree
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
  tree() {
    return this.state.tree || this.data.tree;
  },
  prepareTree() {
    return encodeURIComponent(this.tree())
  },
  validate(tree) {
    //console.log(tree.count())
    //console.log(tree.first().count())
    if (tree.first().get('label') != 'New component')
      return false;

    if(tree.toJSON()[0].children.length != JSON.parse(this.tree())[0].children.length)
      return false;

    return true;
  },
  onItemDrag(items, draggedId) {
    let tree = JSON.stringify(items.toJSON())
    this.setState({tree: tree})
  },
  onItemClick(e, item) {
    console.log(item.get('_id'))
    console.log(item.get('__level'))
    console.log(item.get('label'))
  },
  render() {
    const {viewport, color, iframeLoaded} = this.state;
    const isBrowser = viewport === 'browser';
    const parent = (<CombinePageParent/>);
    const url = `${Meteor.absoluteUrl()}styleguide/_kombine?tree=${this.prepareTree()}`;
    const iframeContainer = (
      <div className={classnames('iframe-container', viewport)}>
        <iframe onLoad={this.onIframeLoad} ref={this.getIframeRef} src={url}/>
      </div>
    );
    const sidebar = (
      <CombinePageSidebar onSpecChange={this.onSpecChange} tree={this.tree()} onItemDrag={this.onItemDrag} onItemClick={this.onItemClick} validate={this.validate}/>
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
