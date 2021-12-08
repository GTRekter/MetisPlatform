import React, { Component } from 'react'
import LessonsService from '../services/LessonsService';
import WordList from '../components/WordList';

export default class Alphabet extends Component {
    constructor(props) {
        super(props)
        this.state = {
            words: []
        }
        this.onChangeQueryString = this.onChangeQueryString.bind(this);
    }
    componentDidMount() {
        this.setState({
            words: LessonsService.getAlphabet()
        });
    }
    onChangeQueryString = (event) => {
        this.setState({
            words: LessonsService.getAllWordsFromString(event.target.value)
        });
    }
    render() {
        return (
            <div>
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">Alphabet</h1>
                    <div className="btn-toolbar mb-2 mb-md-0">
                        <div className="input-group mb-3 px-2 py-2">
                            <input type="text" className="form-control" placeholder="Search" aria-label="Word" name="searchQuery" value={this.state.searchQuery} onChange={(element) => this.onChangeQueryString(element)} />
                        </div>
                    </div>
                </div>
                <WordList words={this.state.words} />
            </div>
        )
    }
}