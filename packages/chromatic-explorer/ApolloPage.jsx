/* global CombinePage:true */
/* global React FlowRouter ChromaticLayout StyleguideReadme ComponentsPageSidebar
ReactMeteorData SingleComponentPage */
import React from 'react';

const {Chromatic} = Package['mdg:chromatic-api'] || {};

ApolloPage = React.createClass({
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
    let tree = encodeURIComponent(JSON.stringify(Chromatic.allKombins()))
    const url = `${Meteor.absoluteUrl()}styleguide/_apollo`;
    const iframeContainer = (
      <div className={classnames('iframe-container', viewport)}>
        <iframe onLoad={this.onIframeLoad} ref={this.getIframeRef} src={url}/>
      </div>
    );
    /*const header = (
      <SingleComponentPageHeader entryName={entryName} specName={specName}
      viewport={viewport} background={color} onSpecChange={this.onSpecChange}
      onViewportClick={this.onViewportClick} onBackgroundChange={this.onBackgroundChange}/>
    );*/
    const sidebar = (
      <ApolloPageSidebar onSpecChange={this.onSpecChange}/>
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


Chromatic.add(ApolloPage, {name: 'apollo', icon: '/icons/apollo.svg', isPage: true});
