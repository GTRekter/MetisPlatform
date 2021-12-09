import React, { Component } from 'react'
import DictionaryService from '../services/DictionaryService';
import WordList from '../components/WordList';

export default class Dictionary extends Component {
    constructor(props) {
        super(props)
        this.state = {
            words: [],
            topics: [],
            topic: ""
        }
        this.onChangeQueryString = this.onChangeQueryString.bind(this);
        this.onClickUpdateWordsByTopic = this.onClickUpdateWordsByTopic.bind(this);
        this.onClickUpdateWordsByAll = this.onClickUpdateWordsByAll.bind(this);
    }
    componentDidMount() {
        const topic = this.props.match.params.topic; 
        console.log("topic: " + topic);
        this.setState({
            words: DictionaryService.getAllWords(),
            topics: DictionaryService.getAllTopics(),
            topic: topic
        });
    }
    onClickUpdateWordsByTopic = (element) => {
        var topic = element.target.getAttribute("data-topic")
        this.setState({
            ...this.state,
            words: DictionaryService.getAllWordsByTopic(topic),
            topic: topic
        });
    };
    onClickUpdateWordsByAll = () => {
        this.setState({
            ...this.state,
            words: DictionaryService.getAllWords(),
            topic: ""
        });
    };
    onChangeQueryString = (event) => {
        this.setState({
            ...this.state,
            words: DictionaryService.getAllWordsFromString(event.target.value, this.state.topic)
        });
    }
    capitalizeFirstLetter(string) { 
        if(string !== undefined && string.length > 0) {
            return string.replace(/^\w/, (c) => c.toUpperCase());
        }
    }
    render() {
        var topicOptions = [];
        topicOptions.push(<li key="0"><span className="dropdown-item pointer" onClick={() => this.onClickUpdateWordsByAll()}>All</span></li>);
        for (var index = 0; index < this.state.topics.length; index++) {
            topicOptions.push(<li key={index+1}><span className="dropdown-item pointer" data-topic={this.state.topics[index]} onClick={(element) => this.onClickUpdateWordsByTopic(element)}>{this.capitalizeFirstLetter(this.state.topics[index])}</span></li>);
        }
        return (
            <div>
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">Dictionary</h1>
                    <div className="btn-toolbar mb-2 mb-md-0">
                        <div className="dropdown px-2 py-2">
                            <span className="btn btn-secondary dropdown-toggle pointer" role="button" id="topicFilterDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                Topics: {this.state.topic !== "" ? this.capitalizeFirstLetter(this.state.topic) : "All"}
                            </span>
                            <ul className="dropdown-menu" aria-labelledby="topicFilterDropdown">
                                {topicOptions}
                            </ul>
                        </div>
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