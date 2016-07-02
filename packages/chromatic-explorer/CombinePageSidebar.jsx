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
    tree: React.PropTypes.string
  },

  onItemDrag(items, draggedId) {
      console.log('onDrag')
      console.log(items)
      console.log(draggedId)
  },

  onItemClick(e, item) {
    console.log(e)
    console.log(e.target)
    console.log(item)
    console.log(item.get('_id'))
    console.log(item.get('__level'))
    console.log(item.get('label'))

  },

  render() {
    let tree = this.props.tree || JSON.stringify(Chromatic.allKombins())

    let validate = function(tree) {
      console.log('validate')
      console.log(tree.count())
      console.log(tree.first())
      console.log(tree.first().count())
      console.log(tree.get('children'))
      console.log(tree.first().get('children'))
      console.log('/validate')
      if (tree.first().get('label') != 'New component')
        return false;
      return true;
    }

    const baseComponents = (
      <div className="base-components">
        <CombinePageParent />
        <NestedListWrap tree={tree} validate={validate} onItemDrag={this.onItemDrag} onItemClick={this.onItemClick} className="list-dark"/>
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