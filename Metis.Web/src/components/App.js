import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { Layout } from './Layout';
import Home from './Home';
import Login from '../pages/Login';
import UsersManagement from '../pages/UsersManagement';
import LessonsManagement from '../pages/LessonsManagement';
import WordsManagement from '../pages/WordsManagement';
import GrammarPointsManagement from '../pages/GrammarPointsManagement';
import StudentsManagement from '../pages/StudentsManagement';
import Dictionary from '../pages/Dictionary';
import FlashCards from '../pages/FlashCards';
import PrivateRoute from './PrivateRoute';
import Pronunciation from '../pages/Pronunciation';
import Profile from '../pages/Profile';
import Lessons from '../pages/Lessons';
import Lesson from '../pages/Lesson';

export default class App extends Component {
    render() {
        return (
            <Switch>
                <Route path='/login' component={Login} />
                <Layout>
                    <PrivateRoute exact path="/" component={Home} />
                    <PrivateRoute exact path="/profile" component={Profile} />
                    <PrivateRoute exact path="/lessons" component={Lessons} />
                    <PrivateRoute exact path="/lesson" component={Lesson} />
                    <PrivateRoute exact path="/dictionary" component={Dictionary} />
                    <PrivateRoute exact path="/flashcards" component={FlashCards} />
                    <PrivateRoute exact path="/pronunciation" component={Pronunciation} />
                    <PrivateRoute exact path="/studentmanagement" component={StudentsManagement} />
                    <PrivateRoute exact path="/usermanagement" component={UsersManagement} />
                    <PrivateRoute exact path="/lessonmanagement" component={LessonsManagement} />
                    <PrivateRoute exact path="/grammarpointmanagement" component={GrammarPointsManagement} />
                    <PrivateRoute exact path="/wordmanagement" component={WordsManagement} />
                </Layout>
            </Switch>
        );
    }
}
