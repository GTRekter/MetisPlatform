import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './Layout';
import Home from './Home';
import Dictionary from '../pages/Dictionary';
import ExerciseSpeak from '../pages/ExerciseSpeak';
import ExerciseRead from '../pages/ExerciseRead';
import LanguageManagement from '../pages/LanguageManagement';
import DictionaryManagement from '../pages/DictionaryManagement';
import WordTypeManagement from '../pages/WordTypeManagement';

export default class App extends Component {
    render () {
        return (
            <Layout>
              <Route exact path='/' component={Home} />
              <Route exact path='/dictionary' component={Dictionary} />
              <Route path='/dictionary/:topic' component={Dictionary} />
              <Route path='/exercise/speak' component={ExerciseSpeak} />
              <Route path='/exercise/read' component={ExerciseRead} />

              <Route path='/admin/language' component={LanguageManagement} /> 
              <Route path='/admin/wordType' component={WordTypeManagement} /> 
              <Route path='/admin/dictionary' component={DictionaryManagement} />       
            </Layout>
        );
    }
}
