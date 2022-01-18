import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faVolumeUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import ReportCard from '../components/ReportCard';
import Pagination from '../components/Pagination';
import WordService from '../services/WordService';
import LanguageService from '../services/LanguageService';
import SpeechService from '../services/SpeechService';
import EmptyPageMessage from '../components/EmptyPageMessage';

export default class Dictionary extends Component {
    constructor(props) {
        super(props)
        this.state = {
            languages: [],
            words: 0,
            activeWords: 0,
            displayedWords: [],
            page: 0,
            pages: undefined,
            wordsPerPage: 10,
            searchQuery: ''
        }
        this.onClickUpdateWordsByPage = this.onClickUpdateWordsByPage.bind(this);
        this.onChangeQueryString = this.onChangeQueryString.bind(this);
        this.onClickChangePage = this.onClickChangePage.bind(this);
    }
    componentDidMount() {
        WordService
            .getWordsByCurrentUserAndPage(this.state.page, this.state.wordsPerPage)
            .then(response => {
                this.setState({
                    displayedWords: response
                });
            })
        WordService
            .getWordsByCurrentUserCount()
            .then(response => {
                this.setState({
                    words: response,
                    pages: Math.floor(response / this.state.wordsPerPage) + 1
                });
            })
        LanguageService
            .getLanguages()
            .then((data) => {
                this.setState({
                    languages: data.filter((language) => language.enabled === true)
                })
            })
    }
    onClickPronounceWords = (string, languageId) => {
        var language = this.state.languages.filter(d => d.id === languageId);
        SpeechService.synthesizeSpeech(string, language[0].code);
    }
    onClickUpdateWordsByPage = (wordsPerPage) => {
        if (this.state.searchQuery === '') {
            WordService
                .getWordsByCurrentUserCount()
                .then(response => {
                    this.setState({
                        words: response,
                        pages: Math.floor(response / wordsPerPage) + 1
                    });
                })
            WordService
                .getWordsByCurrentUserAndPage(this.state.page, wordsPerPage)
                .then(response => {
                    this.setState({
                        ...this.state,
                        displayedWords: response,
                        wordsPerPage: wordsPerPage
                    });
                })
        } else {
            WordService
                .getWordsByCurrentUserAndSearchQueryCount(this.state.searchQuery)
                .then(response => {
                    this.setState({
                        words: response,
                        pages: Math.floor(response / wordsPerPage) + 1
                    });
                })
            WordService
                .getWordsByCurrentUserAndPageAndSearchQuery(this.state.page, wordsPerPage, this.state.searchQuery)
                .then(response => {
                    this.setState({
                        ...this.state,
                        displayedWords: response,
                        wordsPerPage: wordsPerPage
                    });
                })
        }
    }
    onChangeQueryString = (event) => {
        this.setState({
            ...this.state,
            searchQuery: event.target.value
        });
        if (event.target.value === '') {
            WordService
                .getWordsByCurrentUserCount()
                .then(response => {
                    this.setState({
                        words: response,
                        pages: Math.floor(response / this.state.wordsPerPage) + 1
                    });
                })
            WordService
                .getWordsByCurrentUserAndPage(this.state.page, this.state.wordsPerPage)
                .then(response => {
                    this.setState({
                        ...this.state,
                        displayedWords: response
                    });
                })
        } else {
            WordService
                .getWordsByCurrentUserAndSearchQueryCount(event.target.value)
                .then(response => {
                    this.setState({
                        words: response,
                        pages: Math.floor(response / this.state.wordsPerPage) + 1
                    });
                })
            WordService
                .getWordsByCurrentUserAndPageAndSearchQuery(this.state.page, this.state.wordsPerPage, event.target.value)
                .then(response => {
                    this.setState({
                        ...this.state,
                        displayedWords: response
                    });
                })
        }
    }
    onClickChangePage = (page) => {
        if (this.state.searchQuery === '') {
            WordService
                .getWordsByCurrentUserCount()
                .then(response => {
                    this.setState({
                        words: response,
                        pages: Math.floor(response / this.state.wordsPerPage) + 1
                    });
                })
            WordService
                .getWordsByCurrentUserAndPage(page, this.state.wordsPerPage)
                .then(response => {
                    this.setState({
                        ...this.state,
                        displayedWords: response,
                        page: page
                    });
                })
        } else {
            WordService
                .getWordsByCurrentUserAndSearchQueryCount(this.state.searchQuery)
                .then(response => {
                    this.setState({
                        words: response,
                        pages: Math.floor(response / this.state.wordsPerPage) + 1
                    });
                })
            WordService
                .getWordsByCurrentUserAndPageAndSearchQuery(page, this.state.wordsPerPage, this.state.searchQuery)
                .then(response => {
                    this.setState({
                        ...this.state,
                        displayedWords: response,
                        page: page
                    });
                })
        }
    }
    render() {
        let headers = this.state.languages.map((language, index) =>
            <th key={index} className="text-uppercase text-xxs font-weight-bolder opacity-7">{language.name}</th>
        )
        var wordPerPageOptions = [];
        for (var index = 1; index <= 4; index++) {
            let value = index * 10;
            wordPerPageOptions.push(<li key={index}><span className="dropdown-item pointer" onClick={() => this.onClickUpdateWordsByPage(value)}>{value}</span></li>);
        }
        let rows = this.state.displayedWords.map((word, index) => {
            let columns = [];
            this.state.languages.forEach((language, index) => {
                let translation = word.translations.filter((translation) => translation.languageId === language.id);
                if (translation.length > 0) {
                    columns.push(<td key={index} className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-4">{translation[0].text}</td>)
                } else {
                    columns.push(<td key={index} className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-4"></td>)
                }
            })
            return (
                <tr key={index}>
                    <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 td-icon">
                        <button className="btn btn-sm btn-link-secondary" onClick={() => this.onClickPronounceWords(word.text, word.languageId)}>
                            <FontAwesomeIcon icon={faVolumeUp} />
                        </button>
                    </td>
                    <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-4">{word.text}</td>
                    <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-4">{word.romanization}</td>
                    {columns}
                </tr>
            )
        });
        let dictionary = <div>
        <div className="row">
            <div className="col-12 col-sm-4 py-4">
                <ReportCard title="Active words" icon={faUser} color="primary" value={this.state.activeWords} footer={`Total number of words: ${this.state.words}`} />
            </div>
        </div>
        <div className="row">
            <div className="col-8">
                <div className="dropdown d-inline mx-2">
                    <button className="btn bg-gradient-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                        Words per page: {this.state.wordsPerPage}
                        <FontAwesomeIcon className='text-secondary text-white ms-2' icon={faChevronDown} />
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        {wordPerPageOptions}
                    </ul>
                </div>
            </div>
            <div className="col-4">
                <div className="input-group input-group-outline mb-4">
                    <input type="text" className="form-control" placeholder="Search" name="searchQuery" value={this.state.searchQuery} onChange={(element) => this.onChangeQueryString(element)} />
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-12">
                <div className="card">
                    <div className="table-responsive">
                        <table className="table align-items-center">
                            <thead>
                                <tr>
                                    <th className="text-uppercase text-xxs font-weight-bolder opacity-7 ps-2"></th>
                                    <th className="text-uppercase text-xxs font-weight-bolder opacity-7">Text</th>
                                    <th className="text-uppercase text-xxs font-weight-bolder opacity-7">Romanization</th>
                                    {headers}
                                </tr>
                            </thead>
                            <tbody>
                                {rows}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-3">
                        <Pagination page={this.state.page} pages={this.state.pages} onClickChangePageCallback={this.onClickChangePage} />
                    </div>
                </div>
            </div>
        </div>
    </div>
        return (
            <div>
                { this.state.displayedWords.length === 0 ? <EmptyPageMessage/> : dictionary }
            </div>
        )
    }
}