import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { Layout } from './Layout';
import Home from './Home';
import Login from '../pages/Login';
import UsersManagement from '../pages/UsersManagement';
import LessonsManagement from '../pages/LessonsManagement';
import WordsManagement from '../pages/WordsManagement';
import GrammarPointsManagement from '../pages/GrammarPointsManagement';
import Dictionary from '../pages/Dictionary';
import FlashCards from '../pages/FlashCards';
import PrivateRoute from './PrivateRoute';
import Pronunciation from '../pages/Pronunciation';

export default class App extends Component {
    render() {
        return (
            <Switch>
                <Route path='/login' component={Login} />
                <Layout>
                    <PrivateRoute exact path="/" component={Home} />
                    <Route exact path="/dictionary" component={Dictionary} />
                    <Route exact path="/flashcards" component={FlashCards} />
                    <Route exact path="/pronunciation" component={Pronunciation} />
                    <Route path="/usermanagement" component={UsersManagement} />
                    <Route path="/lessonmanagement" component={LessonsManagement} />
                    <Route path="/grammarpointmanagement" component={GrammarPointsManagement} />
                    <Route path="/wordmanagement" component={WordsManagement} />
                </Layout>
            </Switch>
        );
    }
}
