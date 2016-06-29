/* global ComponentSpec:true */
/* global React StyleguideSpec ReactMeteorData FlowRouter classnames */
import React from 'react';
//import { ReactMeteorData } from 'meteor/react-meteor-data';
const { Chromatic } = Package['mdg:chromatic-api'] || {};

import GraphiQL from 'graphiql';
// import { addErrorLoggingToSchema } from 'graphql-tools';
import 'graphiql/graphiql.css';
import { mockServer, MockList } from 'graphql-tools';
import { formatError } from 'graphql';
import casual from 'casual-browserify';

const shorthand = `
  type User {
    id: ID!
    name: String
    lists: [List]
  }

  type List {
    id: ID!
    name: String
    owner: User
    incomplete_count: Int
    tasks(completed: Boolean): [Task]
  }

  type Task {
    id: ID!
    text: String
    completed: Boolean
    list: List
  }

  type RootQuery {
    user(id: ID): User
    users(num: Int): [User]
  }

  schema {
    query: RootQuery
  }
`;

const server = mockServer(shorthand, {
  RootQuery: () => ({
    // return a user whose id matches that of the request
    user: (o, { id }) => ({ id }),
    // return a list with num users in it
    users: (o, { num }) => new MockList(num),
  }),
  List: () => ({
    name: () => casual.title,
    // return a list with 2 - 6 tasks
    tasks: () => new MockList([2, 6], (o, { completed }) => ({ completed })),
  }),
  Task: () => ({ text: casual.sentence }),
  User: () => ({
    name: casual.full_name,
    lists: () => new MockList(3, (user) => ({ owner: user.id })),
  }),
});

// addErrorLoggingToSchema(schema, { log: (err) => console.log(err) });

function graphQLFetcher(graphQLParams) {
  let variables = {};
  try {
    variables = JSON.parse(graphQLParams.variables);
  } catch (e) {
    // do nothing
  }
  return server.query(
    graphQLParams.query,
    variables
  ).then((res) => {
    console.log(res);
    if (res.errors){
      res.errors = res.errors.map(formatError)
    }
    return res;
  });
}


const query = `query tasksForUser{
  user(id: 6) {
    id
    name
    lists {
      name
      completeTasks: tasks(completed: true) {
        completed
        text
      }
      incompleteTasks: tasks(completed: false) {
        completed
        text
      }
      anyTasks: tasks {
        completed
        text
      }
    }
  }
  users(num: 3){
    name
  }
}`;

const vars = '';


ApolloSpec = React.createClass({
  /*mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      tree: decodeURIComponent(FlowRouter.getQueryParam('tree'))
    };
  },*/
  componentWillMount() {
    $('body').addClass('styleguide-white');
    $('html, body').css('height', '100%');
    $('body>div').css('height', '100%');
  },
  render() {
    return (
      <GraphiQL
        fetcher={graphQLFetcher}
        query={query}
        variables={vars} >
      </GraphiQL>
    );
  }
});