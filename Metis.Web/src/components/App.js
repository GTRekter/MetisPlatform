import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { Layout } from './Layout';
import Home from './Home';
import Login from '../pages/Login';
import UsersManagement from '../pages/UsersManagement';
import LessonsManagement from '../pages/LessonsManagement';
import WordsManagement from '../pages/WordsManagement';

export default class App extends Component {
    render() {
        return (
            <Switch>
                <Route path='/login' component={Login} />
                <Layout>
                    <Route exact path="/" component={Home} />
                    <Route path="/usermanagement" component={UsersManagement} />
                    <Route path="/lessonmanagement" component={LessonsManagement} />
                    <Route path="/wordmanagement" component={WordsManagement} />
                </Layout>
            </Switch>
        );
    }
}
