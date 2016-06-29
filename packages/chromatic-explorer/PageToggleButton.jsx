/* global PageToggleButton:true */
/* global React FlowRouter classnames */
import React from 'react';
const {Chromatic} = Package['mdg:chromatic-api'] || {};

PageToggleButton = React.createClass({
  render() {
    const currentPath = FlowRouter.current().path.split('?')[0];

    const links = Chromatic.allPages().map(page => {
      const routeRE = new RegExp(`${page.name}$`),
        active = routeRE.test(currentPath) ? 'active' : '';
      return (
        <a href={FlowRouter.path(`chromatic-${page.name}-styleguide`)}
          key={page.name} className={classnames('btn inverse smaller', active)}><img src={page.icon} className='btn-img'></img></a>
      );
    }).reverse();

    return (
      <div className="btn-group toggle">
        {links}
      </div>
    );
  }
});