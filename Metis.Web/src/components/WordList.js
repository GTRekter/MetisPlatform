import React, { Component } from 'react'
import SpeechService from '../services/SpeechService';
import WordService from '../services/WordService';
import DictionaryService from '../services/DictionaryService';
import Pagination from '../components/Pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeUp, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'

export default class WordList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dictionaries: [],
            words: [],
            page: 0,
            pages: 0,
            itemsPerPage: 25
        }
        this.onClickRemove = this.onClickRemove.bind(this);
        this.onClickPronounceWords = this.onClickPronounceWords.bind(this);
        this.onClickEdit = this.onClickEdit.bind(this);
    }
    componentDidMount() {
        DictionaryService.getEnabledDictionaries()
            .then((data) => {
                this.setState({
                    dictionaries: data
                })
            })
            .catch(function (ex) {
                console.log('Response parsing failed. Error: ', ex);
            });
        WordService.getWordsWithTranslationsByPage(this.state.page, this.state.itemsPerPage)
            .then((data) => {
                this.setState({
                    words: data
                })
            })
            .catch(function (ex) {
                console.log('Response parsing failed. Error: ', ex);
            });
        WordService.getWordsCount()
            .then((data) => {
                this.setState({
                    pages: Math.floor(data / this.state.itemsPerPage)
                })
            })
            .catch(function (ex) {
                console.log('Response parsing failed. Error: ', ex);
            });
    }
    onClickPronounceWords = (string) => {
        SpeechService.synthesizeSpeech(string);
    }
    onClickEdit = () => {
        this.props.onClickEditCallback();
    }
    onClickRemove = (id) => {
        WordService.removeWordById(id)
            .then(() => {
                this.setState({
                    words: this.state.words.filter((word) => word.id !== id)
                })
            })
            .catch(function (ex) {
                console.log('Response parsing failed. Error: ', ex);
            });
    }
    render() {
        let headers = this.state.dictionaries.map((dictionary, index) =>
            <th key={index} className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-center">{dictionary.name}</th>
        )
        let rows = this.state.words.map((word, index) => {
            let columns = [];
            columns.push(<td className="text-center">
                <button className="btn btn-sm btn-link-secondary" onClick={() => this.onClickPronounceWords(word.text)}>
                    <FontAwesomeIcon icon={faVolumeUp} />
                </button>
            </td>);
            this.state.dictionaries.forEach((dictionary) => {
                if (dictionary.id === word.dictionaryId) {
                    columns.push(<td className="text-wrap text-center">{word.text}</td>)
                } else {
                    let translation = word.translations.filter((translation) => translation.dictionaryId === dictionary.id);
                    console.log(word.translations);
                    console.log(dictionary);
                    if (translation.length > 0) {
                        columns.push(<td className="text-wrap text-center">{translation[0].text}</td>)
                    } else {
                        columns.push(<td className="text-wrap text-center"></td>)
                    }
                }
            })
            return (
                <tr key={index}>
                    {columns}
                    <td className="text-center">
                        <button className="btn btn-sm btn-link-secondary" onClick={() => this.onClickEdit(word.id)}>
                            <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button className="btn btn-sm btn-link-danger" onClick={() => this.onClickRemove(word.id)}>
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </td>
                </tr>
            )
        })
        return (
            <div>
                <table className="table align-items-center mb-0">
                    <thead>
                        <tr>
                            <th className="text-secondary opacity-7"></th>
                            {headers}
                            <th className="text-secondary opacity-7"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
                <div className="mt-3">
                    <Pagination page={this.state.page} pages={this.state.pages} />
                </div>
            </div>
        )
    }
}