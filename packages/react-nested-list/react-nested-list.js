import React from 'react';

const {Chromatic} = Package['mdg:chromatic-api'] || {};

import {flatMap, unindex} from 'react-nestedlist/dist/utils/nestedListUtils';
import NestedList, {NestedListItem} from 'react-nestedlist';
import Immutable from 'immutable';

//const flatMap = require('react-nestedlist/dist/utils/nestedListUtils')
//const Immutable = require('immutable');

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      tree: Immutable.fromJS([
        {
          _id: 'startpage',
          label: 'Startpage',
          children: []
        },
        {
          _id: 'page-1',
          label: 'Page 1',
          children: [
            {
              _id: 'page-1a',
              label: 'Page 1a',
              children: []
            },
            {
              _id: 'page-1b',
              label: 'Page 1b',
              children: []
            }
          ]
        },
        {
          _id: 'page-2',
          label: 'Page 2',
          children: []
        }
      ])
    }
  }

  validate(tree) {
    if (tree.first().get('label') !== 'Startpage') return 'Startpage must be first';

    return true;
  }

  render() {
    return (
      <NestedList data={this.state.tree} onDataChange={tree => this.setState({tree})} validate={this.validate}>
        {(items, draggedId) => (
          <div className="list">
            {flatMap(items, item => (
              <NestedListItem key={item.get('_id')} item={item}>
                <div
                  style={{paddingLeft: (item.get('__level') - 1) * 20 + 10}}
                  className={'list-item' + (draggedId === item.get('_id') ? ' list-item-preview' : '')}>
                  {item.get('label')}
                </div>
              </NestedListItem>
            ))}
          </div>
        )}
      </NestedList>
    );
  }
}

export const NestedListWrap = React.createClass({
  propTypes: {
    tree: React.PropTypes.string.isRequired,
    validate: React.PropTypes.func,
    className: React.PropTypes.string,
    onItemDrag: React.PropTypes.func,
    onItemClick: React.PropTypes.func
  },
  getInitialState() {
    return {tree: this.prepare(this.props.tree)}
  },
  prepare(obj) {
    return Immutable.fromJS(JSON.parse(obj))
  },
  validate(tree) {
    if(this.props.validate) {
      return this.props.validate(tree)
    }
    return true
  },
  setParam(key, obj) {
    this.setState({tree: this.prepare(obj)})
  },
  render() {
    let className = "list" + (this.props.className ? (' ' + this.props.className) : '')
    let onItemDrag = this.props.onItemDrag;
    let onItemClick = this.props.onItemClick;
    return (
      <NestedList data={this.state.tree} onDataChange={(tree) => {
        this.setState({tree})
        onItemDrag(unindex(tree))
      }} validate={this.validate}>
        {(items, draggedId) => {
          return (
            <div className={className}>
              {flatMap(items, item => (
                <NestedListItem key={item.get('_id')} item={item}>
                  <div
                    style={{paddingLeft: (item.get('__level') - 1) * 20 + 10}}
                    className={'list-item' + (draggedId === item.get('_id') ? ' list-item-preview' : '')} onClick={(e) => onItemClick(e,item)}>
                    {item.get('label')}
                  </div>
                </NestedListItem>
              ))}
            </div>
          )
        }}
      </NestedList>
    );
  }
}) 

if(Chromatic) {
  Chromatic.add(NestedListWrap, {specs: [
    new Chromatic.Spec("NestedList", {props: {
        tree: JSON.stringify([
          {
            _id: 'newcomp',
            label: 'New component',
            children: []
          },
          {
            _id: 'page-1',
            label: 'Page 1',
            children: [
              {
                _id: 'page-1a',
                label: 'Page 1a',
                children: []
              },
              {
                _id: 'page-1b',
                label: 'Page 1b',
                children: []
              }
            ]
          },
          {
            _id: 'page-2',
            label: 'Page 2',
            children: []
          }
        ]),
        /*validate: function(tree) {
          if (tree.first().get('label') == 'Startpage')
            return 'Startpage must be first';
          return true;
        }*/
      }
    }),
    new Chromatic.Spec("NestedList2", {props: {
        tree: JSON.stringify([
          {
            _id: 'newcomp',
            label: 'New component',
            children: []
          },
          {
            _id: 'page-1',
            label: 'Page 1',
            children: [
              {
                _id: 'page-1a',
                label: 'Page 1a',
                children: []
              },
              {
                _id: 'page-1b',
                label: 'Page 1b',
                children: []
              }
            ]
          },
          {
            _id: 'page-2',
            label: 'Page 2',
            children: []
          }
        ])
      }
    })
  ]
  })
}