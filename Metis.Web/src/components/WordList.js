import React, { Component } from 'react'
import SpeechService from '../services/SpeechService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeUp, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'

export default class WordList extends Component {
    constructor(props) {
        super(props)
        this.onClickRemove = this.onClickRemove.bind(this);
        this.onClickPronounceWords = this.onClickPronounceWords.bind(this);
        this.onClickEdit = this.onClickEdit.bind(this);
    }
    onClickPronounceWords = (string) => {
        SpeechService.synthesizeSpeech(string);
    }
    onClickEdit = () => {
        this.props.onClickEditCallback();
    }
    onClickRemove = (id) => {
        this.props.onClickRemoveCallback(id);
    }
    render() {
        return (
            <div>
                <table className="table align-items-center mb-0">
                    <thead>
                        <tr>
                            <th className="text-secondary opacity-7"></th>
                            {
                                this.props.dictionaries.map((dictionary, index) =>
                                    <th key={index} className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-center">{dictionary.name}</th>
                                )
                            }
                            <th className="text-secondary opacity-7"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.words.map((word, index) =>
                                <tr key={index} className='align-middle'>
                                    <td>
                                        <button className="btn btn-link mx-1 link-dark" onClick={() => this.onClickPronounceWords(word.korean)}>
                                            <FontAwesomeIcon icon={faVolumeUp} />
                                        </button>
                                    </td>
                                    {
                                        this.props.dictionaries.map((dictionary, index) => {
                                            if(dictionary.id === word.idDictionary) {
                                                return <td key={index} className="text-wrap text-center">{word.text}</td>
                                            } else {
                                                return <td key={index} className="text-wrap"></td>
                                            }
                                        })
                                    }
                                    <td className="text-center text-wrap align-middle">
                                        <button className="btn btn-link text-dark font-weight-normal text-xs mb-0" onClick={() => this.onClickEdit()}>
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                        <button className="btn btn-link text-danger font-weight-normal text-xs mb-0" onClick={() => this.onClickRemove(word.id)}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}