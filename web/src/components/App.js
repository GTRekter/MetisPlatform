import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './Layout';
import Home from './Home';
import Reading from './Reading';
import Dictionary from '../pages/Dictionary';

export default class App extends Component {
    render () {
        return (
            <Layout>
              <Route exact path='/' component={Home} />
              <Route path='/dictionary' component={Dictionary} />
              <Route path='/dictionary/:topic' component={Dictionary} />
              <Route exact path='/reading' component={Reading} />
            </Layout>
        );
    }
}
