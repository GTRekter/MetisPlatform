import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './Layout';
import Home from './Home';
// import Login from './Login';
import Dictionary from '../pages/Dictionary';
import Alphabet from '../pages/Alphabet';
import Reading from './Reading';
// import Writing from './Writing';

export default class App extends Component {
    render () {
        return (
            <Layout>
              <Route exact path='/' component={Home} />
              {/* <Route exact path='/login' component={Login} /> */}
              <Route exact path='/alphabet' component={Alphabet} />
              <Route exact path='/dictionary' component={Dictionary} />
              <Route exact path='/reading' component={Reading} />
              {/* <Route exact path='/writing' component={Writing} /> */}
            </Layout>
        );
    }
}
