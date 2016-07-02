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
    tree: React.PropTypes.string,
    onItemDrag: React.PropTypes.func,
    onItemClick: React.PropTypes.func,
    validate: React.PropTypes.func
  },

  render() {
    let tree = this.props.tree || JSON.stringify(Chromatic.allKombins())
    let onItemDrag = this.props.onItemDrag
    let onItemClick = this.props.onItemClick
    let validate = this.props.validate

    const baseComponents = (
      <div className="base-components">
        <CombinePageParent />
        <NestedListWrap tree={tree} validate={validate} onItemDrag={onItemDrag} onItemClick={onItemClick} className="list-dark"/>
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