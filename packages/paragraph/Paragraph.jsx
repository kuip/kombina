/* global Paragraph:true */
import React from 'react';

import { Chromatic } from 'meteor/mdg:chromatic-api';

export const Paragraph = React.createClass({
  propTypes: {
    className: React.PropTypes.string,
    text: React.PropTypes.string
  },
  render() {
    const {text, className, ...other} = this.props;
    let classNames = `${className || ''}`;
    return (
      <div className={classNames} {...other}>
        {text}
      </div>
    );
  }
})

if (Chromatic) {
  Chromatic.add(Paragraph, {
    specs: [
      new Chromatic.Spec('paragraph1', {props: {
        className: 'font-l2',
        text: 'Some Text1'
      }}),
      new Chromatic.Spec('paragraph2', {props: {
        className: 'font-m2',
        text: 'Some Text2'
      }})
    ]
  })
}
