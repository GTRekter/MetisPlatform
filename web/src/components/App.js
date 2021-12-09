import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './Layout';
import Home from './Home';
import Reading from './Reading';
import Dictionary from '../pages/Dictionary';
import Alphabet from '../pages/Alphabet';

export default class App extends Component {
    render () {
        return (
            <Layout>
              <Route exact path='/' component={Home} />
              <Route exact path='/alphabet' component={Alphabet} />
              <Route exact path='/dictionary' component={Dictionary} />
              <Route exact path='/reading' component={Reading} />
            </Layout>
        );
    }
}
