import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './Layout';
import Home from './Home';
// import Login from './Login';
import WordList from './WordList';
import ReadingExercise from './ReadingExercise';
// import ProductCreationForm from './ProductCreationForm';

export default class App extends Component {
    render () {
        return (
            <Layout>
              <Route exact path='/' component={ReadingExercise} />
              {/* <Route exact path='/login' component={Login} /> */}
              <Route exact path='/wordlist' component={WordList} />
              <Route exact path='/reading-exercise' component={ReadingExercise} />
              {/* <Route exact path='/addproduct' component={ProductCreationForm} /> */}
            </Layout>
        );
    }
}
