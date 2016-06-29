/* global Icon:true */
import React from 'react';

import { Chromatic } from 'meteor/mdg:chromatic-api';

export const Icon = React.createClass({
  propTypes: {
    className: React.PropTypes.string
  },
  render() {
    const {text, className, ...other} = this.props;
    let classNames = `${className || ''}`;
    return (
      <span className={classNames} {...other}>
      </span>
    );
  }
})

if (Chromatic) {
  Chromatic.add(Icon, {
    specs: [
      new Chromatic.Spec('icon1', {props: {
        className: 'icon-home'
      }}),
      new Chromatic.Spec('icon2', {props: {
        className: 'icon-star'
      }})
    ]
  })
}
