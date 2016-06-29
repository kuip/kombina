/* global CombinePageSidebar :true */
/* global React FlowRouter PageToggleButton Form */
import React from 'react';
const {Chromatic} = Package['mdg:chromatic-api'] || {};
const {NestedListWrap} = Package['kuip:react-nested-list'] || {};

CombinePageParent = React.createClass({
  render() {
    return (
      <div></div>
    )
  }
})

CombinePageSidebar = React.createClass({
  propTypes: {
    //onFilterInput: React.PropTypes.func.isRequired
  },
  render() {
    let tree = Chromatic.allKombins()
    tree = JSON.stringify(tree)

    const baseComponents = (
      <div className="base-components">
        <CombinePageParent />
        <NestedListWrap tree={tree} className="list-dark"/>
      </div>
    );

    return (
      <div className="styleguide-sidebar">
        <div className="sidebar-content">
          <PageToggleButton/>
          {baseComponents}
        </div>
      </div>
    )
  }
})