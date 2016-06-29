/* global CombinePageSidebar :true */
/* global React FlowRouter PageToggleButton Form */
import React from 'react';
const {Chromatic} = Package['mdg:chromatic-api'] || {};
const {NestedListWrap} = Package['kuip:react-nested-list'] || {};

ApolloPageSidebar = React.createClass({
  propTypes: {
    //onFilterInput: React.PropTypes.func.isRequired
  },
  render() {
    

    const baseComponents = (
      <div className="base-components">
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