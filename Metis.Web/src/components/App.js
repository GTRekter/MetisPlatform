import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './Layout';
import Home from './Home';
import Dictionary from '../pages/Dictionary';
import ExerciseSpeak from '../pages/ExerciseSpeak';
import ExerciseRead from '../pages/ExerciseRead';
import WordManagement from '../pages/WordManagement';

export default class App extends Component {
    render () {
        return (
            <Layout>
              <Route exact path='/' component={Home} />
              <Route exact path='/dictionary' component={Dictionary} />
              <Route path='/dictionary/:topic' component={Dictionary} />
              <Route path='/exercise/speak' component={ExerciseSpeak} />
              <Route path='/exercise/read' component={ExerciseRead} />

              <Route path='/admin/word' component={WordManagement} />       
            </Layout>
        );
    }
}
